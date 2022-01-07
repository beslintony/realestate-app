const db = require("./db");
const helper = require("../helper");

// get all companies
async function getMultiple() {

  const companies = "SELECT * FROM companies";

  let rows = await db.query(companies);

  const data = helper.emptyOrRows(rows);

  for (let i = 0; i < data.length; i++) {
    let element = data[i];

    let userIds = "SELECT User_Id FROM agents where Company_Id = " + element.Id;

    const agentsIds = await db.query(userIds);

    element.Agents = [];

    for (let j = 0; j < agentsIds.length; j++) {
      let agentData = "SELECT * FROM users where Id = (" + agentsIds[j].User_Id + ")";

      element.Agents.push((await db.query(agentData))[0]);
    }
  }

  return {
    data
  };
}

//get one company
async function getSingle(Id) {

  var sql = "SELECT * FROM companies WHERE ID = " + Id;

  let rows = await db.query(sql);

  if (rows.length == 0)
  {
    return {'error': 'Company does not exist'};
  }
    
  const data = helper.emptyOrRows(rows);

  let userIds = "SELECT User_Id FROM agents where Company_Id = " + Id;

  const agentsIds = await db.query(userIds);

  let element = data[0];

  element.Agents = [];

  for (let j = 0; j < agentsIds.length; j++) {
    let agentData = "SELECT * FROM users where Id = (" + agentsIds[j].User_Id + ")";

    element.Agents.push((await db.query(agentData))[0]);

    let getAgentId = "SELECT Id FROM agents where User_Id = " + agentsIds[j].User_Id;
    element.Agents[j].AgentId = (await db.query(getAgentId))[0].Id;
  }

  return {
    data
  };
}

module.exports = {
  getMultiple,
  getSingle
};
