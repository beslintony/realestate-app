const db = require("./db");
const helper = require("../helper");

async function getMultiple(params) {
  var sql =
    "SELECT Id FROM agents WHERE User_Id = (SELECT Id FROM users WHERE Name = '" +
    params.user.username +
    "')";
  var agentId = (await db.query(sql))[0].Id;

  sql =
    "SELECT * FROM realestates WHERE Status_Id != 4 AND Agent_Id = " + agentId; //query for realestates without already deleted items

  const rows = await db.query(sql);

  const data = helper.emptyOrRows(rows);

  // add images
  for (let i = 0; i < data.length; i++) {
    var element = data[i];

    sql =
      "SELECT content FROM realestateimages WHERE Real_Estate_Id = " +
      element.Id;
    var images = await db.query(sql);

    element.Images = [];

    for (let j = 0; j < images.length; j++) {
      element.Images.push(images[j].content);
    }
  }

  return {
    data,
  };
}

async function getSingle(params) {
  var sql =
    "SELECT Id FROM agents WHERE User_Id = (SELECT Id FROM users WHERE Name = '" +
    params.user.username +
    "')";
  var agentId = (await db.query(sql))[0].Id;

  sql =
    "SELECT * FROM realestates WHERE Id = " +
    params.params.id +
    " AND Agent_Id = " +
    agentId +
    " AND Status_Id NOT IN (4,6)"; // get all realestates which are not sold or deleted

  const rows = await db.query(sql);

  const data = helper.emptyOrRows(rows);

  for (let i = 0; i < data.length; i++) {
    var element = data[i];

    // get images
    sql =
      "SELECT content FROM realestateimages WHERE Real_Estate_Id = " +
      element.Id;
    var images = await db.query(sql);

    element.Images = [];

    for (let j = 0; j < images.length; j++) {
      element.Images.push(images[j].content);
    }

    // set agent
    sql =
      "SELECT name FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = " +
      element.Agent_Id +
      ")";
    element.Agent = (await db.query(sql))[0].name;

    // set company
    sql = "SELECT * FROM agents WHERE Id = " + element.Agent_Id;
    agent = await db.query(sql);
    element.CompanyId = agent[0].Company_Id;

    sql = "SELECT * FROM companies WHERE ID = " + element.CompanyId;
    var company = await db.query(sql);
    element.CompanyName = company[0].Name;
  }

  return {
    data,
  };
}

async function del(params) {
  var sql =
    "SELECT Id FROM agents WHERE User_Id = (SELECT Id FROM users WHERE Name = '" +
    params.user.username +
    "')";
  var agentId = (await db.query(sql))[0].Id;

  // update status
  var updateSql =
    "UPDATE realestates SET Status_Id = 4 WHERE Id = " +
    params.params.id +
    " AND Agent_Id = " +
    agentId;

  await db.query(updateSql);

  return;
}

async function sell(params) {
  sql =
    "SELECT Id FROM agents WHERE User_Id = (SELECT Id FROM users WHERE Name = '" +
    params.user.username +
    "')";
  var agentId = (await db.query(sql))[0].Id;

  var sql =
    "SELECT Real_Estate_Id FROM contexts WHERE Id = " +
    params.params.id +
    " AND Agent_Id = " +
    agentId;
  var realestateId = await db.query(sql);

  // check if context matches with agent
  if (realestateId.length == 0) {
    return { error: "Context does not match" };
  }
  realestateId = (await db.query(sql))[0].Real_Estate_Id;
  
  var selectSql = "SELECT * FROM realestates WHERE Id = " + realestateId + " AND Status_Id = 3";
  var realestate = await db.query(selectSql);

  // check if realestate is available
  if (realestate.length == 0)
  {
    return { 'error': 'Realestate is not available' };
  }

  // update status
  var updateSql =
    "UPDATE realestates SET Status_Id = 6 WHERE Id = " +
    realestateId +
    " AND Status_Id = 3";

  await db.query(updateSql);

  // insert new purchase
  var d = new Date();
  var insertSql =
    "INSERT INTO purchases(Context_Id,Date,Payment) VALUES (" +
    params.params.id +
    ",'" +
    d.toISOString().split("T")[0] +
    "'," +
    params.body.payment +
    ")";

  await db.query(insertSql);

  return {};
}

module.exports = {
  getMultiple,
  getSingle,
  del,
  sell,
};
