const nounChunksApi = require('../api/nounChunksExtractionApi');

exports.getNounChuncksExtraction = async textVal => {
  const response = await nounChunksApi.getNounChuncksExtraction(textVal);
  const result = response.result[0];
  return result;
};
