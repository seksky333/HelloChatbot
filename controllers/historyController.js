/* eslint-disable no-restricted-syntax */
const store = require('store');

const {
  user0,
  user1,
  user2,
  user3,
  user4,
  user5
} = require('../data/eat_out_history');

exports.reset = () => {
  store.clearAll();
};

exports.loadEatOutHistoryData = () => {
  store.set('users', [user0, user1, user2, user3, user4, user5]);
};
/*
this getEatOutHistoryDataInMatrix() will generate the following matrix output
[
  [ 0, 0, 1, 0, 0 ],
  [ 1, 1, 1, 0, 0 ],
  [ 0, 0, 0, 1, 1 ],
  [ 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 0 ],
  [ 0, 1, 0, 0, 0 ]
]
*/
exports.getEatOutHistoryDataInMatrix = async () => {
  return new Promise((resolve, reject) => {
    try {
      const users = store.get('users');
      const ratings = [];
      for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
          const userRatingList = [];
          const user = users[key];
          user.eatOuthistory.forEach(review => {
            const isRecommended = review.isRecommended ? 1 : 0;
            userRatingList.push(isRecommended);
          });
          ratings.push(userRatingList);
        }
      }
      resolve(ratings);
    } catch (e) {
      reject(e);
    }
  });
};

exports.getEatOutHistoryDataRestaurants = async () => {
  return new Promise((resolve, reject) => {
    try {
      const users = store.get('users');
      const restaurants = [];
      users[0].eatOuthistory.forEach(review => {
        const { restaurant } = review;
        restaurants.push(restaurant);
      });
      resolve(restaurants);
    } catch (e) {
      reject(e);
    }
  });
};
