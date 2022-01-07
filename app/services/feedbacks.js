const db = require("./db");
const helper = require("../helper");

// create a feedback of the customer to an agent
async function create(params) {
  const userId =
    "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";

  //query checks for the existence more than one feedback for an agent per user
  const checkPreviousFeedbackQuery =
    "SELECT Id from feedbacks WHERE Customer_Id = (" +
    userId +
    ") AND Agent_Id = '" +
    params.body.agentId +
    "'";

  const previousRating = await db.query(checkPreviousFeedbackQuery);

  // creates a new feedback when no previous rating for the agent has been found
  if (!previousRating.length) {
    const createFeedback =
      "INSERT INTO feedbacks( Rating, Comment, Customer_Id, Agent_Id) " +
      "VALUES ('" +
      params.body.rating +
      "','" +
      params.body.comment +
      "',(" +
      userId +
      "),'" +
      params.body.agentId +
      "')";

    const result = await db.query(createFeedback);

    return result;
  }
}
// edit the current customer feedback for an agent
async function edit(params) {
  // edits an existing feedback
  const userId =
    "SELECT Id FROM users WHERE Name = '" + params.user?.username + "'";

  const editFeedback =
    "UPDATE feedbacks SET Rating = '" +
    params.body.rating +
    "', Comment= '" +
    params.body.comment +
    "'  WHERE Customer_Id = (" +
    userId +
    ") AND Id =" +
    params.params.id;

  await db.query(editFeedback);
  return;
}

// get all feedbacks of an agent
async function getAgentFeedbacks(params) {
  // gets the feedback for a specific agent
  const AgentfeedbacksQuery =
    "SELECT * FROM feedbacks WHERE Agent_Id = " + params.agentId;
  const rows = await db.query(AgentfeedbacksQuery);
  const data = helper.emptyOrRows(rows);

  // adds more elements to the api endpoint
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    // gets Customer Name and Profile Picture
    const CustomerNameQuery =
      "SELECT Name,Picture FROM users WHERE Id = " + el.Customer_Id;
    const Customer = await db.query(CustomerNameQuery);
    el.Customer_Name = Customer[0].Name;
    el.Picture = Customer[0].Picture;
    // gets Company name
    const CompanyQuery =
      "SELECT Name FROM companies WHERE Id = (SELECT Company_Id FROM agents WHERE Id = " +
      params.agentId +
      ")";
    const Company = await db.query(CompanyQuery);
    el.Company_Name = Company[0].Name;
    // gets Agent Name
    const AgentNameQuery =
      "SELECT Name FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = '" +
      params.agentId +
      "')";
    const AgentName = await db.query(AgentNameQuery);
    el.Agent_Name = AgentName[0].Name;
  }

  return data;
}

// get the current customer feedback of an agent 
async function getCustomerFeedback(params, user) {
  const userIdQuery = "SELECT Id FROM users WHERE Name = '" + user.username + "'";

  // gets customer feedback for a agent
  const CustomerfeedbacksQuery =
    "SELECT * FROM feedbacks WHERE Customer_Id = (" + userIdQuery + ") AND Agent_Id ='" + params.id + "'";

  const rows = await db.query(CustomerfeedbacksQuery);
  const data = helper.emptyOrRows(rows);

  return data;
}
// get the agent details and average rating of an agent
async function getAverageRating(params) {
  // gets all rating of the agent from db
  const AgentfeedbacksQuery =
    "SELECT Rating FROM feedbacks WHERE Agent_Id = " + params.agentId;
  const rows = await db.query(AgentfeedbacksQuery);
  const data = helper.emptyOrRows(rows);

  // adds agent infos like id, name, picture and company name to the api end point
  const AgentInfoQuery =
    "SELECT Id AS Agent_Id, Name, Picture FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = " +
    params.agentId +
    ")";
  const AgentInfo = await db.query(AgentInfoQuery);
  const Agent_Info = AgentInfo[0];

  // company name
  const CompanyQuery =
    "SELECT Name FROM companies WHERE Id = (SELECT Company_Id FROM agents WHERE Id = " +
    params.agentId +
    ")";
  const Company = await db.query(CompanyQuery);
  Agent_Info.Company_Name = Company[0].Name;
  Agent_Info.Id = Number(params.agentId);

  // calcs average
  let sum = 0;
  data.map((el) => (sum += el.Rating));

  Agent_Info.Average_Rating = sum / data.length;

  const result = helper.emptyOrRows(Agent_Info);

  return [result];
}
// delete a customer feedback for an agent
async function deleteFeedback(params) {
  const userId =
    "SELECT Id FROM users WHERE Name = '" + params.user?.username + "'";

  // deletes the feedback of the agent
  const deleteQuery =
    "DELETE FROM feedbacks WHERE Customer_Id = (" +
    userId +
    ") AND Id = '" +
    params.params.id +
    "'";

  await db.query(deleteQuery);
  return;
}

module.exports = {
  create,
  edit,
  deleteFeedback,
  getAgentFeedbacks,
  getCustomerFeedback,
  getAverageRating,
};
