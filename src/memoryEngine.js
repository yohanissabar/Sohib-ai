const db = require("../db");

function saveMemory(userId, key, value) {
  db.insertMemory(userId, key, value);
}

function getMemory(userId, callback) {
  const data = db.getMemory(userId);
  callback(data);
}

module.exports = { saveMemory, getMemory };
