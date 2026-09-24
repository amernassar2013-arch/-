// demo.js — end-to-end walkthrough tying every module together
// Run with: node demo.js
//
// Flow: user picks categories + days
//   -> generateItinerary() orders & splits places (distance.js + places.js)
//   -> (optional) LLM themed descriptions (descriptions.js)
//   -> weather check per place (followup.js)
//   -> sample follow-up question (followup.js, needs ANTHROPIC_API_KEY to actually call the API)

const { generateItinerary } = require("./itinerary.js");
const { suggestWeatherAlternative } = require("./followup.js");

async function runDemo() {
  console.log("=== Jordan Tourism App — Full Flow Demo ===\n");

  // 1) User input
  const userChoice = { categories: ["ruins", "desert"], days: 3, theme: "adventure" };
  console.log("User selected:", userChoice, "\n");

  // 2) Generate the base itinerary (places.js + distance.js under the hood)
  const itineraryResult = generateItinerary(userChoice.categories, userChoice.days);
  console.log(`Itinerary generated: ${itineraryResult.itinerary.length} day(s), ` +
    `${itineraryResult.totalPlacesConsidered} places matched, ` +
    `${itineraryResult.unusedPlaces.length} left over.\n`);

  itineraryResult.itinerary.forEach((day) => {
    console.log(`Day ${day.day}: ${day.places.map((p) => p.name).join(" -> ")}`);
  });

  // 3) Themed descriptions (only actually calls Claude if ANTHROPIC_API_KEY is set)
  console.log("\n--- Themed descriptions ---");
  if (process.env.ANTHROPIC_API_KEY) {
    const { enrichItineraryWithDescriptions } = require("./descriptions.js");
    const enriched = await enrichItineraryWithDescriptions(itineraryResult, userChoice.theme);
    enriched.itinerary[0].places.forEach((p) => {
      console.log(`- ${p.name}: ${p.themedDescription}`);
    });
  } else {
    console.log("(skipped — set ANTHROPIC_API_KEY to see real LLM-generated descriptions)");
  }

  // 4) Weather check for every place in day 1
  console.log("\n--- Weather check (assume rain) ---");
  itineraryResult.itinerary[0].places.forEach((place) => {
    const alt = suggestWeatherAlternative(place, "rain");
    console.log(
      alt
        ? `- ${place.name}: not ideal in rain, suggest "${alt.name}" instead`
        : `- ${place.name}: fine in rain, no change needed`
    );
  });

  // 5) Sample follow-up question (only actually calls Claude if ANTHROPIC_API_KEY is set)
  console.log("\n--- Follow-up question ---");
  const firstPlace = itineraryResult.itinerary[0].places[0];
  if (process.env.ANTHROPIC_API_KEY) {
    const { askFollowUp } = require("./followup.js");
    const answer = await askFollowUp(firstPlace, "What should I wear here?");
    console.log(`Q: What should I wear at ${firstPlace.name}?\nA: ${answer}`);
  } else {
    console.log(`(skipped — would ask Claude: "What should I wear at ${firstPlace.name}?")`);
  }

  console.log("\n=== Demo complete — all modules connected successfully ===");
}

runDemo().catch((err) => {
  console.error("Demo failed:", err);
  process.exit(1);
});
