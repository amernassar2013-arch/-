// itinerary.js — builds a day-by-day itinerary from selected categories
const places = require("./places.js");
const { haversineDistance } = require("./distance.js");

const AVG_SPEED_KMH = 60; // rough driving speed estimate between sites
const DEFAULT_DAY_BUDGET_HOURS = 8; // visiting + driving time per day

/**
 * Order a list of places using a simple nearest-neighbor route,
 * so consecutive places are always geographically close.
 */
function orderByProximity(placeList) {
  if (placeList.length <= 1) return [...placeList];

  const remaining = [...placeList];
  // Start from the westmost place (arbitrary but stable starting point)
  remaining.sort((a, b) => a.lng - b.lng);
  const route = [remaining.shift()];

  while (remaining.length > 0) {
    const current = route[route.length - 1];
    let nearestIdx = 0;
    let nearestDist = Infinity;

    remaining.forEach((place, idx) => {
      const d = haversineDistance(current.lat, current.lng, place.lat, place.lng);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = idx;
      }
    });

    route.push(remaining.splice(nearestIdx, 1)[0]);
  }

  return route;
}

/**
 * Split an ordered route into days, respecting a daily time budget
 * (visit time + estimated travel time between consecutive stops).
 */
function splitIntoDays(orderedPlaces, days, dayBudgetHours) {
  // Places are pre-capped to fit total capacity (see generateItinerary),
  // so a fixed per-day budget is enough to balance them across days.
  const effectiveBudget = dayBudgetHours;
  const result = Array.from({ length: days }, () => []);
  let dayIndex = 0;
  let hoursUsedToday = 0;
  let prevPlace = null;

  for (const place of orderedPlaces) {
    const travelHours = prevPlace
      ? haversineDistance(prevPlace.lat, prevPlace.lng, place.lat, place.lng) / AVG_SPEED_KMH
      : 0;
    const neededHours = travelHours + place.visitDurationHours;

    const wouldOverflow = hoursUsedToday + neededHours > effectiveBudget;
    const hasNextDay = dayIndex < days - 1;

    if (wouldOverflow && hasNextDay && result[dayIndex].length > 0) {
      dayIndex += 1;
      hoursUsedToday = 0;
      prevPlace = null;
    }

    result[dayIndex].push({
      ...place,
      travelHoursFromPrevious: prevPlace ? Number(travelHours.toFixed(1)) : 0,
    });

    hoursUsedToday += neededHours;
    prevPlace = place;
  }

  return result;
}

/**
 * Generate a full itinerary.
 * @param {string[]} categories - e.g. ["ruins", "desert"]
 * @param {number} days - trip length in days
 * @param {object} [options]
 * @returns {object} { itinerary: [{day, places}], unusedPlaces, totalPlacesConsidered }
 */
function generateItinerary(categories, days, options = {}) {
  const dayBudgetHours = options.dayBudgetHours || DEFAULT_DAY_BUDGET_HOURS;

  const filtered = places.filter((p) => categories.includes(p.category));

  if (filtered.length === 0) {
    return { itinerary: [], unusedPlaces: [], totalPlacesConsidered: 0 };
  }

  const ordered = orderByProximity(filtered);

  // Only keep as many places as realistically fit in the trip length,
  // so a long matching list doesn't get crammed into every day.
  const totalCapacityHours = days * dayBudgetHours;
  const fittingPlaces = [];
  let cumulativeHours = 0;
  ordered.forEach((place, idx) => {
    const prev = ordered[idx - 1];
    const travelHours = prev
      ? haversineDistance(prev.lat, prev.lng, place.lat, place.lng) / AVG_SPEED_KMH
      : 0;
    const neededHours = travelHours + place.visitDurationHours;
    if (cumulativeHours + neededHours <= totalCapacityHours || fittingPlaces.length === 0) {
      fittingPlaces.push(place);
      cumulativeHours += neededHours;
    }
  });

  const dayGroups = splitIntoDays(fittingPlaces, days, dayBudgetHours);

  const itinerary = dayGroups
    .map((dayPlaces, idx) => ({ day: idx + 1, places: dayPlaces }))
    .filter((d) => d.places.length > 0);

  // Places that didn't fit because there were more days worth of content than `days`
  const usedIds = new Set(itinerary.flatMap((d) => d.places.map((p) => p.id)));
  const unusedPlaces = ordered.filter((p) => !usedIds.has(p.id));

  return {
    itinerary,
    unusedPlaces,
    totalPlacesConsidered: filtered.length,
  };
}

module.exports = { generateItinerary, orderByProximity, splitIntoDays };
