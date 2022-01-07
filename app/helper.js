const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });
const env = process.env;

var refreshTokens = [];

function getAccessTokenSecret() {
  return env.accessTokenSecret;
}

function getRefreshTokenSecret() {
  return env.refreshTokenSecret;
}

function getRefreshTokens() {
  return refreshTokens;
}

function setRefreshTokens(tokens) {
  refreshTokens = tokens;
}

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

//token administration
function authenticateJWT(req) {
  const authHeader = req.headers.authorization;
  var error;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, getAccessTokenSecret(), (err, user) => {
      if (err) {
        error = 403;
      } else {
        req.user = user;
      }
    });
  } else {
    error = 401;
  }

  return error;
};

module.exports = {
  getOffset,
  emptyOrRows,
  authenticateJWT,
  getAccessTokenSecret,
  getRefreshTokenSecret,
  getRefreshTokens,
  setRefreshTokens,
}
