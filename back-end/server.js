// server.js — Express API for the Jordan Tourism App

const express = require("express");
const cors = require("cors");
const places = require("./places.js");
const { generateItinerary } = require("./itinerary.js");
const { askFollowUp, suggestWeatherAlternative } = require("./followup.js");
const { enrichItineraryWithDescriptions } = require("./descriptions.js");

const app = express();
app.use(cors()); // allow the React frontend (different port) to call this API
app.use(express.json());

const VALID_CATEGORIES = ["mountains", "ruins", "desert", "deadsea"];

// ----- GET /places — list all places (optionally filter by category) -----
app.get("/places", (req, res) => {
  const { category } = req.query;

  if (category && !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`,
    });
  }

  const result = category ? places.filter((p) => p.category === category) : places;
  res.json({ count: result.length, places: result });
});

// ----- POST /itinerary — generate a day-by-day plan -----
// body: { categories: string[], days: number, theme?: string }
// If 'theme' is provided (e.g. "adventure", "history", "relaxation"),
// each place's description is rewritten by the LLM to match that theme.
app.post("/itinerary", async (req, res) => {
  const { categories, days, theme } = req.body;

  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: "'categories' must be a non-empty array." });
  }
  const invalidCategories = categories.filter((c) => !VALID_CATEGORIES.includes(c));
  if (invalidCategories.length > 0) {
    return res.status(400).json({
      error: `Invalid categories: ${invalidCategories.join(", ")}. Must be one of: ${VALID_CATEGORIES.join(", ")}`,
    });
  }
  if (!Number.isInteger(days) || days < 1 || days > 14) {
    return res.status(400).json({ error: "'days' must be an integer between 1 and 14." });
  }
  if (theme !== undefined && typeof theme !== "string") {
    return res.status(400).json({ error: "'theme', if provided, must be a string." });
  }

  const result = generateItinerary(categories, days);

  if (!theme) {
    return res.json(result);
  }

  try {
    const enriched = await enrichItineraryWithDescriptions(result, theme);
    res.json(enriched);
  } catch (err) {
    // Themed descriptions are a nice-to-have — never fail the whole request over them.
    res.json({ ...result, themeError: err.message });
  }
});

// ----- POST /places/:id/ask — follow-up question about a specific place -----
// body: { question: string }
app.post("/places/:id/ask", async (req, res) => {
  const { question } = req.body;
  const place = places.find((p) => p.id === req.params.id);

  if (!place) {
    return res.status(404).json({ error: `No place found with id '${req.params.id}'.` });
  }
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "'question' (string) is required." });
  }

  try {
    const answer = await askFollowUp(place, question);
    res.json({ place: place.name, question, answer });
  } catch (err) {
    res.status(502).json({ error: "Failed to reach AI service.", details: err.message });
  }
});

// ----- POST /places/:id/weather-alternative — swap suggestion for bad weather -----
// body: { condition: "rain" | "extreme_heat" | "cold" }
app.post("/places/:id/weather-alternative", (req, res) => {
  const { condition } = req.body;
  const place = places.find((p) => p.id === req.params.id);

  if (!place) {
    return res.status(404).json({ error: `No place found with id '${req.params.id}'.` });
  }
  if (!["rain", "extreme_heat", "cold"].includes(condition)) {
    return res.status(400).json({ error: "'condition' must be one of: rain, extreme_heat, cold." });
  }

  const alternative = suggestWeatherAlternative(place, condition);
  res.json({
    original: place.name,
    condition,
    swapNeeded: Boolean(alternative),
    alternative: alternative || null,
  });
});

// ----- health check -----
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Jordan Tourism API running on http://localhost:${PORT}`);
});

module.exports = app;
