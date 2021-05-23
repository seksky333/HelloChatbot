const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;
const password = process.env.PASSWORD;
const key = Buffer.from(password, 'base64');
const ENCRYPTION_KEY = key;

exports.encrypt = () => {
  const apiKey = '<API_KEY>';
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  let encrypted = cipher.update(apiKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  console.log(`${iv.toString('hex')}:${encrypted.toString('hex')}`);
};

exports.decrypt = text => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
