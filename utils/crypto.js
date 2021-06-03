const bcrypt = require("bcryptjs");

function hashPassword(plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function (err, salt) {
      if (err) return reject(err);
      bcrypt.hash(plainPassword, salt, function (err, hash) {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
}

function comparePassword(plainPassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hash, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

module.exports = { hashPassword, comparePassword };
