const fs = require('fs');

exports.writeFile = async (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(new Error('failed cannot writting a file'));
      resolve('success');
    });
  });
};
exports.readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(new Error('failed cannot reading a file'));
      resolve(data);
    });
  });
};
