const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  var sql =
    "SELECT * FROM realestates WHERE Status_Id = 1";

  const rows = await db.query(sql); // get all realestates for review

  const data = helper.emptyOrRows(rows);

  for (let i = 0; i < data.length; i++) {
    var element = data[i];

    // get images
    sql =
      "SELECT content FROM realestateimages WHERE Real_Estate_Id = " +
      element.Id;
    var images = await db.query(sql);

    element.Images = [];

    for (let j = 0; j < images.length; j++)
    {
      element.Images.push(images[j].content);
    }

    // get agent
    sql =
      "SELECT name FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = " +
      element.Agent_Id +
      ")";
    element.Agent = (await db.query(sql))[0].name;

    sql = "SELECT * FROM agents WHERE Id = " + element.Agent_Id;
    agent = await db.query(sql);
    element.CompanyId = agent[0].Company_Id;

    // get company
    sql = "SELECT * FROM companies WHERE ID = " + element.CompanyId;
    var company = await db.query(sql);
    element.CompanyName = company[0].Name;
  }

  return {
    data,
  };
}

async function getSingle(params) {
  var sql =
    "SELECT * FROM realestates WHERE Id = " + params.params.id + " AND Status_Id = 1"; // get one real estate for review

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

    for (let j = 0; j < images.length; j++)
    {
      element.Images.push(images[j].content);
    }

    // get agent
    sql =
      "SELECT name FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = " +
      element.Agent_Id +
      ")";
    element.Agent = (await db.query(sql))[0].name;

    sql = "SELECT * FROM agents WHERE Id = " + element.Agent_Id;
    agent = await db.query(sql);
    element.CompanyId = agent[0].Company_Id;

    // get company
    sql = "SELECT * FROM companies WHERE ID = " + element.CompanyId;
    var company = await db.query(sql);
    element.CompanyName = company[0].Name;
  }

  return {
    data,
  };
}

async function evaluate(params) {

  var StatusId;

  // accept or decline real estate
  if (params.body.accept == 1)
  {
    StatusId = 3;
  }
  else
  {
    StatusId = 2;
  }
  var updateSql = "UPDATE realestates SET Status_Id = " + StatusId + " WHERE Id = " + params.params.id + " AND Status_Id = 1";

  await db.query(updateSql);

  return;
}

module.exports = {
  getMultiple,
  getSingle,
  evaluate
};
