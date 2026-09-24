// api.js — put this in your React project's src/ folder (e.g. src/api.js)
// Central place for every call to the Express backend.

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// GET /places?category=...
export function getPlaces(category) {
  const query = category ? `?category=${category}` : "";
  return request(`/places${query}`);
}

// POST /itinerary  { categories, days, theme? }
export function getItinerary({ categories, days, theme }) {
  return request("/itinerary", {
    method: "POST",
    body: JSON.stringify({ categories, days, theme }),
  });
}

// POST /places/:id/ask  { question }
export function askAboutPlace(placeId, question) {
  return request(`/places/${placeId}/ask`, {
    method: "POST",
    body: JSON.stringify({ question }),
  });
}

// POST /places/:id/weather-alternative  { condition }
export function getWeatherAlternative(placeId, condition) {
  return request(`/places/${placeId}/weather-alternative`, {
    method: "POST",
    body: JSON.stringify({ condition }),
  });
}