const { create } = require('apisauce');

exports.nounChunksExtraction = create({
  baseURL: 'https://textanalysis.p.rapidapi.com/spacy-noun-chunks-extraction',
  timeout: 30000
});

exports.sentimentAnalysis = create({
  baseURL: 'https://textanalysis.p.rapidapi.com/',
  timeout: 30000
});
exports.sentimentAnalysisPlaceholder = create({
  baseURL: 'https://textanalysis.p.rapidapi.com/textblob-sentiment-analysis',
  timeout: 30000
});
