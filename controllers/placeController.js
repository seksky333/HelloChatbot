const placeApi = require('../api/placeApi');
const place = require('../models/Place');

exports.getPlaces = async (coordinate, searchTerm, isHappy) => {
  const type = 'restaurant';
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  const travelDistance = isHappy ? 5000 : 1500;
  const response = await placeApi.getPlaces(
    coordinate,
    travelDistance,
    type,
    searchTerm
  );
  const bestRestaurants = await place.getHighRatingPlaces(response);
  //returning the best restaurant's name
  return bestRestaurants[0].name;
};
