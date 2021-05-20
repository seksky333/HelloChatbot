const recommend = require('collaborative-filter');
const sentimentApi = require('../api/sentimentAnalysisApi');
const nounChunksApi = require('../api/nounChunksExtractionApi');
const sentimentController = require('./sentimentAnalysisController');
const nounChunksController = require('./nounChunksController');
const classificationController = require('./classificationController');
const placeController = require('./placeController');
const placeApi = require('../api/placeApi');
const place = require('../models/Place');

const historyController = require('./historyController');

exports.getHello = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      message: 'Hello World'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getNounChuncksExtraction = async (req, res) => {
  const response = await nounChunksApi.getNounChuncksExtraction(
    'No special preference. Just want to go to a restaurant.'
  );
  const result = response.result[0];

  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getSentimentAnalysis = async (req, res) => {
  const response = await sentimentApi.getSentimentAnalysis('bad');
  const isPositive = response.Polarity > 0;

  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      isPositive
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getPlaces = async (req, res) => {
  const coordinate = { lat: -42.867133, lng: 147.311423 };
  const type = 'restaurant';
  const keyword = 'Peacock and Jones';
  //done by sentiment analysis
  const isHappy = true;
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  const travelDistance = isHappy ? 5000 : 1500;
  const response = await placeApi.getPlaces(
    coordinate,
    travelDistance,
    type,
    keyword
  );
  const bestRestaurants = await place.getHighRatingPlaces(response);

  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      bestRestaurants
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getClassification = async (req, res) => {
  //get Eat Out History in matrix
  const matrix = await historyController.getEatOutHistoryDataInMatrix();
  const restaurants = await historyController.getEatOutHistoryDataRestaurants();
  const recommendedRest = recommend.cFilter(matrix, 0)[0];
  const recommendation = restaurants[recommendedRest];
  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      recommendation
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getRecommendation = async (req, res) => {
  const userCoordinate = { lat: -42.867133, lng: 147.311423 };
  const canTravelFar = true;
  const { feeling, cuisinePreference, numberOfPeople, typeOfMeal } = req.query;

  const isHappy = await sentimentController.getSentimentAnalysis(feeling);
  const cuisinePref = await nounChunksController.getNounChuncksExtraction(
    cuisinePreference
  );
  const peopeleSize = await nounChunksController.getNounChuncksExtraction(
    numberOfPeople
  );
  const mealType = await nounChunksController.getNounChuncksExtraction(
    typeOfMeal
  );
  const searchTerm = `${peopeleSize} ${cuisinePref} ${mealType}`;
  let recommendation;
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  if (isHappy)
    recommendation = await placeController.getPlace(
      userCoordinate,
      searchTerm,
      canTravelFar
    );
  else recommendation = await classificationController.getClassification();

  const recommendationDetails = await placeController.getPlaceByName(
    userCoordinate,
    recommendation
  );

  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      recommendation,
      recommendationDetails
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getMoreRecommendations = async (req, res) => {
  const userCoordinate = { lat: -42.867133, lng: 147.311423 };
  const canTravelFar = false;
  const { cuisinePreference, numberOfPeople, typeOfMeal } = req.query;

  const cuisinePref = await nounChunksController.getNounChuncksExtraction(
    cuisinePreference
  );
  const peopeleSize = await nounChunksController.getNounChuncksExtraction(
    numberOfPeople
  );
  const mealType = await nounChunksController.getNounChuncksExtraction(
    typeOfMeal
  );
  const searchTerm = `${peopeleSize} ${cuisinePref} ${mealType}`;
  /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
  const recommendations = await placeController.getPlaces(
    userCoordinate,
    searchTerm,
    canTravelFar
  );

  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      recommendations
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
