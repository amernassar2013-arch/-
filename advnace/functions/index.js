const { onCall, HttpsError } = require("firebase-functions/v2/https");

// ==================================================
// ضع مفتاح الـ API الخاص بك هنا
// ==================================================
const ANTHROPIC_API_KEY = "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";

const PLACES = [
  {
    id: "place_1",
    name: "Amman Citadel",
    region: "Amman",
    hours: 2,
    costJod: 3,
    distanceKm: 0,
    rating: 4.6
  },
  {
    id: "place_2",
    name: "Roman Theater",
    region: "Amman",
    hours: 1.5,
    costJod: 2,
    distanceKm: 2,
    rating: 4.5
  }
  // أضف باقي عناصر الأماكن هنا بنفس التنسيق
];

const ALLOWED_INTERESTS = [
  "history",
  "nature",
  "desert",
  "sea",
  "food",
  "adventure",
];

const ALLOWED_LANGS = ["ar", "en", "it"];

const LANG_NAMES = {
  ar: "Arabic",
  en: "English",
  it: "Italian",
};

// --------------------------------------------------
// Clean user input
// --------------------------------------------------

function cleanInput(data) {
  data = data || {};

  const days = Math.min(
    Math.max(parseInt(data.days, 10) || 1, 1),
    14
  );

  const budget = Math.max(Number(data.budget) || 0, 0);

  const rawInterests = Array.isArray(data.interests)
    ? data.interests
    : [];

  const interests = rawInterests.filter((i) =>
    ALLOWED_INTERESTS.includes(i)
  );

  const lang = ALLOWED_LANGS.includes(data.lang)
    ? data.lang
    : "en";

  const startCity =
    String(data.startCity || "Amman")
      .replace(/[^A-Za-z ]/g, "")
      .slice(0, 30)
      .trim() || "Amman";

  return {
    days,
    budget,
    interests,
    lang,
    startCity,
  };
}

// --------------------------------------------------
// Build AI prompt
// --------------------------------------------------

function buildPrompt(
  { days, budget, interests, lang, startCity },
  places
) {
  const interestsText = interests.length
    ? interests.join(", ")
    : "no specific interests (general highlights)";

  const budgetText =
    budget > 0
      ? `${budget} JOD`
      : "not specified";

  return `
You are a Jordan trip planner.

Use ONLY the places in the list below.
Never invent places or IDs.

Trip request:
- Number of days: 
${days}
- Starting city: 
${startCity}
- Interests: 
${interestsText}
- Budget: 
${budgetText}

Rules:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not write anything outside the JSON.
- Format:

{
  "days": [
    {
      "day": 1,
      "placeIds": ["id1", "id2"],
      "note": "..."
    }
  ]
}

- Return exactly 
${days} day(s).
- Number days from 1.
- Group places from the same region together.
- Avoid mixing distant regions in the same day.
- Keep each day realistic.
- Total hours of places in a day should be 8 or less.
- Prefer places matching the user's interests.
- You may add high-star highlights if they fit.
- Never use the same place twice.
- Never invent an ID.
- If costJod is "unknown", do not invent a price.
- distanceKm means distance from Amman.
- Write each note in 
${LANG_NAMES[lang]}.
- Notes should be 1-2 short sentences.

Places:

${JSON.stringify(places)}
`;
}

// --------------------------------------------------
// Call Anthropic
// --------------------------------------------------

async function callModel(prompt, apiKey) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, 25000);

  try {
    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 3000,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "Anthropic error:",
        response.status,
        errorText
      );

      throw new Error(
        `AI API error ${response.status}`
      );
    }

    const data = await response.json();

    return (data.content || [])
      .map((block) =>
        block.type === "text"
          ? block.text
          : ""
      )
      .join("");

  } finally {
    clearTimeout(timer);
  }
}

// --------------------------------------------------
// Parse and validate AI response
// --------------------------------------------------

function parseAndValidate(text, daysRequested, placeIds) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON in AI response");
  }

  const parsed = JSON.parse(
    text.slice(start, end + 1)
  );

  if (
    !parsed ||
    !Array.isArray(parsed.days)
  ) {
    throw new Error("Bad JSON shape");
  }

  const used = new Set();

  const days = parsed.days
    .slice(0, daysRequested)
    .map((day, index) => {

      const ids = (
        Array.isArray(day.placeIds)
          ? day.placeIds
          : []
      ).filter((id) => {

        if (
          !placeIds.has(id) ||
          used.has(id)
        ) {
          return false;
        }

        used.add(id);

        return true;
      });

      return {
        day: index + 1,
        placeIds: ids,
        note: String(
          day.note || ""
        ).slice(0, 400),
      };
    });

  if (used.size === 0) {
    throw new Error(
      "AI returned no valid places"
    );
  }

  return {
    days,
  };
}

// --------------------------------------------------
// Firebase Callable Function
// --------------------------------------------------

exports.planTrip = onCall(
  {
    timeoutSeconds: 60,
  },

  async (request) => {
    try {
      const input = cleanInput(request.data);

      const placeIds = new Set(
        PLACES.map((place) => place.id)
      );

      const prompt = buildPrompt(
        input,
        PLACES
      );

      const text = await callModel(
        prompt,
        ANTHROPIC_API_KEY
      );

      return parseAndValidate(
        text,
        input.days,
        placeIds
      );

    } catch (error) {
      console.error(
        "planTrip failed:",
        error.message
      );

      throw new HttpsError(
        "internal",
        "AI planner unavailable"
      );
    }
  }
);