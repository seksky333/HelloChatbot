const FormData = require('form-data');
const request = require('request');

exports.getSentimentAnalysis = async textVal => {
  const apiKey = process.env.RAPID_API_KEY;
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
