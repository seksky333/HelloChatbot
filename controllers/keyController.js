const encryptionController = require('./encryptionController');

exports.getGoogleAPIKey = () => {
  const encryptedApiKey = process.env.ENCRYPTED_GOOGLE_MAPS_API_KEY;
  return encryptionController.decrypt(encryptedApiKey);
};

exports.getRapidAPIKey = () => {
  const encryptedApiKey = process.env.ENCRYPTED_RAPID_API_KEY;
  return encryptionController.decrypt(encryptedApiKey);
};
