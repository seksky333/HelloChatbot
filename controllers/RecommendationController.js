const recommend = require('collaborative-filter');
const sentimentApi = require('../api/sentimentAnalysisApi');
const nounChunksApi = require('../api/nounChunksExtractionApi');
const sentimentController = require('./sentimentAnalysisController');
const nounChunksController = require('./nounChunksController');
const classificationController = require('./classificationController');
const keyController = require('./keyController');
const placeController = require('./placeController');
const placeApi = require('../api/placeApi');
const place = require('../models/Place');

const historyController = require('./historyController');

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
  const canTravelFar = true;
  const {
    coordinate,
    feeling,
    cuisinePreference,
    numberOfPeople,
    typeOfMeal
  } = req.query;
  //if coordinate is not give, default location will be used
  const userCoordinate =
    coordinate != null ? coordinate : { lat: -42.867133, lng: 147.311423 };

  try {
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

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      recommendation,
      recommendationDetails
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getMoreRecommendations = async (req, res) => {
  const canTravelFar = false;
  const { coordinate } = req.query;
  try {
    //if coordinate is not give, default location will be used
    const userCoordinate =
      coordinate != null ? coordinate : { lat: -42.867133, lng: 147.311423 };

    const searchTerm = `restaurants`;
    /*
  if happy pick the best rated restaurant
  if not happy pick the friends' chosen restaurant 
  */
    const recommendations = await placeController.getPlaces(
      userCoordinate,
      searchTerm,
      canTravelFar
    );

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

exports.getAPIKey = async (req, res) => {
  const apiKey = keyController.getGoogleAPIKey();

  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      apiKey
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
