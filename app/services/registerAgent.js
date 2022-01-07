const db = require('./db');
const helper = require('../helper');
const bcrypt = require('bcrypt');

async function insert(params) {
  var hash = await bcrypt.hash(params.password, 10); // create hash of password

  var sql =
    "SELECT Id FROM users WHERE Name = '" + params.username + "'";

  let user = await db.query(sql);
  var data;

  // check if username already exists
  if (user.length > 0) {
    return { usererror: 'User already exists' };
  }

  sql =
    'Select Verificationcode FROM companies where Id = ' +
    params.company;

  var code = (await db.query(sql))[0].Verificationcode;

  const checkCode = await bcrypt.compare(params.verification, code); // hash entered verification code and compare it with database password
  // check if verification code matches with database password
  if (!checkCode) {
    return { verificationerror: 'Verificationcode is wrong' }; // return error
  }

  let image = params.images.length > 0 ? "'" + params.images[0] + "'" : 'NULL';

  // insert user
  var insertUser = `INSERT INTO users(Name,Password,User_Role_Id,Picture) VALUES ('${params.username}','${hash}',2,${image})`;
  user = await db.query(insertUser);
  var userID = user.insertId;

  // insert user into agents
  sql = 'SELECT * FROM users WHERE Id = ' + userID;
  user = await db.query(sql);
  var insertAgent =
    'INSERT INTO agents(User_Id,Company_Id) VALUES (' +
    userID +
    ',' +
    params.company +
    ')';
  let agent = await db.query(insertAgent);
  sql = 'SELECT * FROM agents WHERE Id = ' + agent.insertId;
  agent = await db.query(sql);

  // set data
  user[0].AgentId = agent[0].Id;
  user[0].CompanyId = agent[0].Company_Id;
  data = helper.emptyOrRows(user);

  return {
    data,
  };
}

module.exports = {
  insert,
};
