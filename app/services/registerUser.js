const db = require("./db");
const helper = require("../helper");
const bcrypt = require('bcrypt');

async function insert(params) {
  var hash = await bcrypt.hash(params.password, 10); // create hash of password

  var sql = "SELECT Id FROM users WHERE Name = '" + params.username + "'";

  let rows = await db.query(sql);

  // check if user already exists
  if (rows.length > 0) {
    return { 'error': 'User already exists' };
  }
  else {
    // insert user
    let image = params.images.length > 0 ? "'" + params.images[0] + "'" : 'NULL';
    var insertUser = `INSERT INTO users(Name,Password,User_Role_Id,Picture) VALUES ('${params.username}','${hash}',1,${image})`;
    rows = await db.query(insertUser);
    sql = "SELECT * FROM users WHERE Id = " + rows.insertId;
    rows = await db.query(sql);
  }

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

module.exports = {
  insert
};
