const recommend = require('collaborative-filter');
const historyController = require('./historyController');

exports.getClassification = async () => {
  //get Eat Out History in matrix
  const matrix = await historyController.getEatOutHistoryDataInMatrix();
  const restaurants = await historyController.getEatOutHistoryDataRestaurants();
  const recommendedRest = recommend.cFilter(matrix, 0)[0];
  const recommendation = restaurants[recommendedRest];
  return recommendation;
};
