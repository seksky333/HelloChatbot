const sentimentApi = require('../api/sentimentAnalysisApi');

exports.getSentimentAnalysis = async textVal => {
  const response = await sentimentApi.getSentimentAnalysis(textVal);
  const isPositive = response.Polarity > 0;
  return isPositive;
};
