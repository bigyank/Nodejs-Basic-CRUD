const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "users.json");

function readDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, (err, data) => {
      if (err) return reject(err);
      const users = JSON.parse(data);
      resolve(users);
    });
  });
}

function writeToDatabase(dataToWrite) {
  return new Promise((resolve, reject) => {
    const users = JSON.stringify(dataToWrite, null, 2);
    fs.writeFile(dbPath, users, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function findUser(username) {
  const users = await readDatabase();
  const foundUser = users.find((user) => user.username === username);
  return foundUser;
}

async function saveUser(user) {
  const users = await readDatabase();
  users.push(user);
  writeToDatabase(users);
}

module.exports = { findUser, saveUser };
