/* eslint-disable no-restricted-syntax */

exports.getHighRatingPlaces = async places => {
  return new Promise((resolve, reject) => {
    const placeList = [];
    try {
      for (const key in places) {
        if (Object.hasOwnProperty.call(places, key)) {
          const place = places[key];
          const ratedPlace = {
            name: place.name,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            address: place.vicinity,
            photos: place.photos
          };
          placeList.push(ratedPlace);
        }
      }
      //sort by user ratings total
      placeList.sort(function(a, b) {
        return b.user_ratings_total - a.user_ratings_total;
      });
      //get the first top items
      const popularPlaces = placeList.slice(0, 10);
      //sort by ratings
      popularPlaces.sort(function(a, b) {
        return b.rating - a.rating;
      });
      //get the first 5 items
      const bestPlaces = popularPlaces.slice(0, 5);
      resolve(bestPlaces);
    } catch (e) {
      reject(e);
    }
  });
};
