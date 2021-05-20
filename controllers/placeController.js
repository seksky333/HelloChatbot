const placeApi = require('../api/placeApi');
const place = require('../models/Place');

exports.getPlace = async (coordinate, searchTerm, canTravelFar) => {
  const type = 'restaurant';
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  const travelDistance = canTravelFar ? 5000 : 1500;
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

exports.getPlaceByName = async (coordinate, searchTerm) => {
  const type = 'restaurant';
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  const response = await placeApi.getPlaceByName(coordinate, type, searchTerm);
  //returning the best restaurant's name
  return response;
};

exports.getPlaces = async (coordinate, searchTerm, canTravelFar) => {
  const type = 'restaurant';
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  const travelDistance = canTravelFar ? 5000 : 1500;
  const response = await placeApi.getPlaces(
    coordinate,
    travelDistance,
    type,
    searchTerm
  );
  const bestRestaurants = await place.getHighRatingPlaces(response);
  //returning the best restaurant's name
  return bestRestaurants;
};
