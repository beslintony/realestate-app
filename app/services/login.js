// import
const db = require("./db");
const jwt = require('jsonwebtoken');
const helper = require('../helper');
const bcrypt = require('bcrypt');


// function to check if username and password matches
// create access and refresh tokens to store user data for api routes
async function check(username, enteredPassword) {

  // get userrole and password
  const getUserData = "SELECT User_Role_Id,Password FROM users WHERE Name = '" + username + "'";
  let rows = await db.query(getUserData);

  // check if username exists
  if (rows.length > 0) {
    const password = rows[0].Password; // get password from database

    const result = await bcrypt.compare(enteredPassword, password); // hash entered password and compare it with database password

    // check if password matches with database password
    if (!result) {
      return { 'error': 'Username and password does not match' }; // return error
    }

    // get userrole type
    const getUserroleType = "SELECT Type FROM roles WHERE Id = " + rows[0].User_Role_Id;
    let role = (await db.query(getUserroleType))[0].Type;

    const accessToken = jwt.sign({ username: username, role: role }, helper.getAccessTokenSecret(), { expiresIn: '60m' }); // create acces token
    const refreshToken = jwt.sign({ username: username, role: role }, helper.getRefreshTokenSecret()); // create refresh token

    //add refresh token to acceptable refresh tokens
    var refreshTokens = helper.getRefreshTokens();
    refreshTokens.push(refreshToken);
    helper.setRefreshTokens(refreshTokens);

    return { 'AccessToken': accessToken, 'RefreshToken': refreshToken }; // return access and refresh tokens
  }
  else {
    return { 'error': 'Username does not exist' }; // return error
  }
}

// export
module.exports = {
  check
};
