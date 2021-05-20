const sentimentApi = require('./../api/sentimentAnalysisApi');
const placeApi = require('./../api/placeApi');
const place = require('./../models/Place');

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
  const keyword = 'restaurant';
  //done by sentiment analysis
  const isHappy = false;
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
  console.log(response);
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
  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      message: 'Hello Classification'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
