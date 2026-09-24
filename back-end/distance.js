// distance.js — Haversine formula: distance between two lat/lng points (in km)

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculate the great-circle distance between two points on Earth.
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} distance in kilometers
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Distance between two place objects (each must have lat/lng fields).
 */
function distanceBetweenPlaces(placeA, placeB) {
  return haversineDistance(placeA.lat, placeA.lng, placeB.lat, placeB.lng);
}

/**
 * Given a list of places, return a distance matrix (2D array, in km).
 * matrix[i][j] = distance between places[i] and places[j]
 */
function buildDistanceMatrix(places) {
  return places.map((placeA) =>
    places.map((placeB) => distanceBetweenPlaces(placeA, placeB))
  );
}

module.exports = {
  haversineDistance,
  distanceBetweenPlaces,
  buildDistanceMatrix,
};
