const { Client } = require('@googlemaps/google-maps-services-js');

exports.getPlaces = async (coordinate, travelDistance, type, keyword) => {
  const client = new Client({});
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  return new Promise((resolve, reject) => {
    client
      .placesNearby({
        params: {
          location: coordinate,
          language: 'en',
          radius: travelDistance,
          type: type,
          keyword: keyword,
          key: apiKey
        },
        timeout: 1000 // milliseconds
      })
      .then(r => {
        const responseJson = r.data.results;
        resolve(responseJson);
      })
      .catch(e => {
        console.error(e);
        reject(e);
      });
  });
};

exports.getPlaceByName = async (coordinate, type, keyword) => {
  const client = new Client({});
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  return new Promise((resolve, reject) => {
    client
      .placesNearby({
        params: {
          location: coordinate,
          language: 'en',
          radius: 5000,
          type: type,
          keyword: keyword,
          key: apiKey
        },
        timeout: 1000 // milliseconds
      })
      .then(r => {
        const responseJson = r.data.results;
        resolve(responseJson);
      })
      .catch(e => {
        console.error(e);
        reject(e);
      });
  });
};
