const request = require('request');
const keyController = require('../controllers/keyController');

exports.getSentimentAnalysis = async textVal => {
  const apiKey = keyController.getRapidAPIKey();
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'https://textanalysis.p.rapidapi.com/textblob-sentiment-analysis',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'textanalysis.p.rapidapi.com',
          useQueryString: true,
          'x-rapidapi-key': apiKey
        },
        form: {
          text: textVal
        }
      },
      function(e, r, body) {
        if (e) {
          reject(e);
        } else {
          const responseJson = JSON.parse(body);
          resolve(responseJson);
        }
      }
    );
  });
};
