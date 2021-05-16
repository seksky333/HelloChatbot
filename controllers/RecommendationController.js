const sentimentApi = require('./../api/sentimentAnalysisApi');

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
