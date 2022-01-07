const db = require("./db");
const helper = require("../helper");
const bcrypt = require("bcrypt");
const fs = require('fs');

async function getUser(user) {
  var sql = "SELECT * FROM users WHERE NAME = '" + user.username + "'"; // get user data

  let rows = await db.query(sql);

  // check if user exists
  if (rows.length > 0) {
    const data = helper.emptyOrRows(rows)[0];
    data.role = user.role;
    return data;
  }
  return { error: "User does not exist" };
}

async function getAgent(user) {
  var sql = "SELECT * FROM users WHERE NAME = '" + user.username + "'"; // get agent data

  let rows = await db.query(sql);

  // check if agent exists
  if (rows.length > 0) {
    const data = helper.emptyOrRows(rows)[0];
    data.Role = user.role;

    // get agent id
    const getAgentId = "SELECT Id FROM agents where User_Id = " + data.Id;
    data.AgentId = (await db.query(getAgentId))[0].Id;

    // get company
    var sql =
      "SELECT Name FROM companies WHERE ID = (SELECT Company_Id FROM agents where User_Id = " +
      data.Id +
      ")";
    data.Company = (await db.query(sql))[0].Name;

    return data;
  }
  return { error: "Agent does not exist" };
}

async function updatePassword(params) {
  var hash = await bcrypt.hash(params.body.password, 10);

  // update password
  var updatePassword =
    "UPDATE users SET Password = '" +
    hash +
    "' WHERE Name = '" +
    params.user.username +
    "'";
  await db.query(updatePassword);

  return; 
}

async function updatePicture(params) {

  let getImage = "SELECT Picture FROM users where Name = '" + params.user.username + "'";

  let image = (await db.query(getImage))[0].Picture;

  const path = 'public/images/' + image;

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    }
  })

  var updatePicture =
    "UPDATE users SET Picture = '" +
    params.body.images[0] +
    "' WHERE Name = '" +
    params.user.username +
    "'";
  await db.query(updatePicture);

  return;
}

module.exports = {
  getUser,
  getAgent,
  updatePassword,
  updatePicture
};
