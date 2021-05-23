const request = require('request');
const keyController = require('../controllers/keyController');

exports.getNounChuncksExtraction = async textVal => {
  const apiKey = keyController.getRapidAPIKey();
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'https://textanalysis.p.rapidapi.com/spacy-noun-chunks-extraction',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Mashape-Key': apiKey,
          Accept: 'application/json'
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
