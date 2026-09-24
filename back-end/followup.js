// followup.js — Step 5: follow-up questions (via LLM) + weather-based alternatives
const places = require("./places.js");
const { haversineDistance } = require("./distance.js");

// ===== 1. Follow-up questions (e.g. "شو ألبس بوادي رم؟") =====

/**
 * Ask a free-form follow-up question about a specific place in the itinerary.
 * Uses the Claude API — requires ANTHROPIC_API_KEY in the environment.
 *
 * @param {object} place - a place object from places.js
 * @param {string} question - the user's question, e.g. "what should I wear here?"
 * @returns {Promise<string>} the answer text
 */
async function askFollowUp(place, question) {
  const systemPrompt = `You are a helpful Jordan travel assistant. Answer briefly (2-4 sentences),
practically, and specifically to the place described below. If the question is unrelated
to travel/visiting this place, politely redirect to travel-related help.

Place: ${place.name} (${place.nameAr})
Category: ${place.category}
City/Area: ${place.city}
Description: ${place.description}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: question }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const textBlock = data.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}

// ===== 2. Weather-based alternatives =====

// Which categories are considered "outdoor-sensitive" per weather condition,
// and which categories make good indoor/lower-impact substitutes.
const WEATHER_RULES = {
  rain: {
    affected: ["desert", "mountains"],
    preferredAlternatives: ["ruins"], // e.g. covered/urban archaeological sites, museums-adjacent
  },
  extreme_heat: {
    affected: ["desert"],
    preferredAlternatives: ["mountains", "deadsea"], // higher altitude or water-based
  },
  cold: {
    affected: ["deadsea", "desert"], // desert nights get cold too
    preferredAlternatives: ["ruins", "mountains"],
  },
};

/**
 * Suggest a same-day alternative place if the planned place's category
 * is poorly suited to the given weather condition.
 *
 * @param {object} place - the currently planned place
 * @param {"rain"|"extreme_heat"|"cold"} weatherCondition
 * @param {object[]} [candidatePool] - places to choose from (defaults to full dataset)
 * @returns {object|null} the suggested alternative place, or null if no swap needed/possible
 */
function suggestWeatherAlternative(place, weatherCondition, candidatePool = places) {
  const rule = WEATHER_RULES[weatherCondition];
  if (!rule || !rule.affected.includes(place.category)) {
    return null; // current place is fine for this weather
  }

  const candidates = candidatePool.filter(
    (p) => p.id !== place.id && rule.preferredAlternatives.includes(p.category)
  );

  if (candidates.length === 0) return null;

  // Pick the geographically closest suitable alternative
  candidates.sort(
    (a, b) =>
      haversineDistance(place.lat, place.lng, a.lat, a.lng) -
      haversineDistance(place.lat, place.lng, b.lat, b.lng)
  );

  return candidates[0];
}

module.exports = { askFollowUp, suggestWeatherAlternative, WEATHER_RULES };
