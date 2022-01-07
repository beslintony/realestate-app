const db = require("./db");
const helper = require("../helper");

async function getMultiple(user) {

  var userSql = "SELECT Id FROM users WHERE Name = '" + user.username + "'";
  var contextSql = "SELECT * FROM contexts WHERE ";
  let agentId;

  if (user.role == "Customer") {
    contextSql += "Customer_Id = (" + userSql + ")";
  }
  else {
    agentSql = "SELECT Id FROM agents WHERE User_Id = (" + userSql + ")";
    agentId = (await db.query(agentSql))[0].Id;
    contextSql += "Agent_Id = " + agentId;
  }

  const rows = await db.query(contextSql); // get all contexts of user

  const data = helper.emptyOrRows(rows);

  for (let i = 0; i < data.length; i++) {
    var element = data[i];

    sql = "SELECT Name,Picture FROM users WHERE Id = ";

    if (user.role == "Customer") {
      element.CommPartnerId = element.Agent_Id;
      sql += "(SELECT User_Id FROM agents WHERE Id = " + element.Agent_Id + ")";
    }
    else {
      element.CommPartnerId = element.Customer_Id;
      sql += element.Customer_Id;
    }

    let CommUser = (await db.query(sql))[0]; // get communication partner for each context

    element.CommPartner = CommUser.Name;
    element.CommPicture = CommUser.Picture;

    sql = "SELECT Title FROM realestates WHERE Id = " + element.Real_Estate_Id;
    element.Realestate = (await db.query(sql))[0].Title; // get real estate for each context

  }

  return {
    data
  };
}

async function check(user) {
  var userSql = "SELECT Id FROM users WHERE Name = '" + user.username + "'";

  var getSentMessages = "Select * FROM messages WHERE Status_Id = 1 AND Receiver = (" + userSql + ")";
  const res = await db.query(getSentMessages);

  return (res.length !== 0);
}

async function getSingle(params) {

  var contextSql = "SELECT * FROM contexts WHERE Id = " + params.params.id;
  var userSql = "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";

  if (params.user.role == "Customer") {
    contextSql += " AND Customer_Id = (" + userSql + ")";
  }
  else {
    let getAgentId = "SELECT Id FROM agents WHERE User_Id = (" + userSql + ")";
    let AgentId = (await db.query(getAgentId))[0].Id;
    contextSql += " AND Agent_Id = " + AgentId;
  }

  const context = await db.query(contextSql); // get one context

  var data;

  // check if user matches with context
  if (context.length === 0) {
    data = { "error": "context does not match with user" };
  }
  else {
    // set status of received messages to read
    var updateStatus = "UPDATE messages SET Status_Id = 2 WHERE Context_Id = " + context[0].Id + " AND Receiver = (" + userSql + ")";
    await db.query(updateStatus);

    sql = "SELECT * FROM messages WHERE Context_Id = " + context[0].Id;

    const rows = await db.query(sql); // get all messages of context

    data = helper.emptyOrRows(rows);

    for (let i = 0; i < data.length; i++) {
      var element = data[i];

      sql = "SELECT Name FROM users WHERE Id = " + element.Sender;
      element.Sender_Id = element.Sender;
      element.Sender = (await db.query(sql))[0].Name; // get sender

      sql = "SELECT Name FROM users WHERE Id = " + element.Receiver;
      element.Receiver_Id = element.Receiver;
      element.Receiver = (await db.query(sql))[0].Name; // get receiver

      sql = "SELECT Type FROM messagestatus WHERE Id = " + element.Status_Id;
      element.Status = (await db.query(sql))[0].Type; // get message status
    }
  }

  return {
    data
  };
}

async function create(params) {

  var User_Id = "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";

  var contextSql = "SELECT Id FROM contexts WHERE Customer_Id = (" + User_Id + ") AND Agent_Id = " + params.body.agent + " AND Real_Estate_Id = " + params.body.realestate;
  var contextId = await db.query(contextSql);

  // check if context already exists
  if (contextId.length === 0) {
    var createContext = "INSERT INTO contexts(Customer_Id,Agent_Id,Real_Estate_Id) VALUES ((" + User_Id + ")," + params.body.agent + "," + params.body.realestate + ")";
    contextId = await db.query(createContext);
    contextId = contextId.insertId;
  }
  else {
    contextId = contextId[0].Id;
  }

  return {
    contextId
  };
}

async function insert(params) {

  var d = new Date();

  var senderSql = "Select * FROM users where name = '" + params.user.username + "'";
  var sender = (await db.query(senderSql))[0].Id; // get sender
  var context;

  //differentiate between user roles to get context data
  if (params.user.role == "Customer") {
    var contextSql = "SELECT * FROM contexts where Id = " + params.params.id + " AND Customer_Id = " + sender;
    context = await db.query(contextSql);
  }
  else {
    contextSql = "SELECT * FROM contexts where Id = " + params.params.id + " AND Agent_Id = (SELECT Id FROM agents WHERE User_Id = " + sender + ")";
    context = await db.query(contextSql);
  }

  //check if context matches with sender
  if (!context) {
    return { "error": "context does not match with sender" };
  }

  var receiver = params.user.role == "Customer" ? "(SELECT User_Id FROM agents WHERE Id = " + context[0].Agent_Id + ")" : context[0].Customer_Id; // get receiver

  // insert new message
  var insertSql = "INSERT INTO messages(Content,Sender,Receiver,Datetime,Context_Id,Status_Id) VALUES ('" + params.body.Content + "'," + sender + "," + receiver + ",'" + d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0] + "'," + params.params.id + ",1)";
  await db.query(insertSql);

  return { "data": "ok" };
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  insert,
  check
};
