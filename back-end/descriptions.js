// descriptions.js — Step 3: LLM-generated custom descriptions per place/theme
// Requires ANTHROPIC_API_KEY in the environment.

/**
 * Ask Claude to rewrite a place's description tailored to the user's chosen theme.
 * e.g. the same site described differently for a "history lover" vs an "adventure seeker".
 *
 * @param {object} place - a place object (name, category, description, ...)
 * @param {string} theme - user-facing theme/interest, e.g. "adventure", "history", "relaxation", "photography"
 * @returns {Promise<string>} a 2-3 sentence custom description
 */
async function generateThemedDescription(place, theme) {
  const systemPrompt = `You are a Jordan travel content writer. Rewrite the place description below
in 2-3 engaging sentences, tailored to a traveler interested in "${theme}".
Keep it factually consistent with the base description. Do not invent facts (opening hours, prices, etc).
Respond with ONLY the rewritten description, no preamble.`;

  const userPrompt = `Place: ${place.name} (${place.nameAr})
Category: ${place.category}
Base description: ${place.description}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const textBlock = data.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text.trim() : place.description;
}

/**
 * Enrich a full itinerary (from generateItinerary) with a themed description
 * for every place, running requests in parallel per day.
 *
 * @param {object} itineraryResult - the { itinerary, unusedPlaces, ... } object
 * @param {string} theme - user's chosen theme
 * @returns {Promise<object>} same shape, with `themedDescription` added to each place
 */
async function enrichItineraryWithDescriptions(itineraryResult, theme) {
  const enrichedDays = await Promise.all(
    itineraryResult.itinerary.map(async (day) => {
      const enrichedPlaces = await Promise.all(
        day.places.map(async (place) => {
          try {
            const themedDescription = await generateThemedDescription(place, theme);
            return { ...place, themedDescription };
          } catch (err) {
            // Fall back to the base description if the LLM call fails,
            // so one failed request doesn't break the whole itinerary.
            return { ...place, themedDescription: place.description, themeError: err.message };
          }
        })
      );
      return { ...day, places: enrichedPlaces };
    })
  );

  return { ...itineraryResult, itinerary: enrichedDays, theme };
}

module.exports = { generateThemedDescription, enrichItineraryWithDescriptions };
