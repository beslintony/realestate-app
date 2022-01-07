const db = require("./db");
const helper = require("../helper");
const realestates = require("../services/realestates");

async function createFavourite(params) {

  //get the userId
  const userId =
    "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";

  //create new database entry with the userId and realestateId
  const createFavourites =
    "INSERT INTO favourites ( Real_Estate_Id, Customer_Id) " +
    "VALUES ('" +
    params.params.id +
    "',(" +
    userId +
    "))";

  const result = await db.query(createFavourites);
  return result;
}

async function getFavourite(params) {
  //get the user Id 
  const userIdQuery = "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";

  //get realestate Ids from the favourites of the user
  const realestateIdQuery = "SELECT Real_Estate_Id FROM favourites WHERE Customer_Id = (" + userIdQuery + ")";
  rows = await db.query(realestateIdQuery);
  const realestateIds = helper.emptyOrRows(rows);

  let result = [];

  // iterate over the realestates
  for (let i = 0; i < realestateIds.length; i++) {
    //get the realestate from its id
    params.params.id = realestateIds[i].Real_Estate_Id;

    //get all data from a single realestate 
    let realestate = (await realestates.getSingle(params, true)).data;
    if (realestate.error) {
      continue; // if real estate not available, won't be shown
    }
    //add realestate data to results
    result.push(realestate[0]);
  }

  return result;
}

async function deleteFavourite(params) {
  //get the user Id 
  const userIdQuery = "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";

  //delete the favourite with the corresponding realestateId
  const deleteQuery =
    "DELETE FROM favourites WHERE Customer_Id = (" +
    userIdQuery +
    " ) AND Real_Estate_Id = " +
    params.params.id + "";

  await db.query(deleteQuery);
  return;
}

async function checkFavourite(params) {
  //get the user Id 
  const userIdQuery = "SELECT Id FROM users WHERE Name = '" + params.user.username + "'";


  //check if realestate is already saved as a favourite
  //return true or false
  const isFavouriteQuery =
    "SELECT EXISTS (SELECT 1 FROM favourites WHERE Customer_Id = (" + userIdQuery + " ) AND Real_Estate_Id = " + params.params.realestateid + ") AS isFavourite";

  rows = await db.query(isFavouriteQuery);
  const result = helper.emptyOrRows(rows);
  return result;
};

module.exports = {
  createFavourite,
  deleteFavourite,
  getFavourite,
  checkFavourite,
};
