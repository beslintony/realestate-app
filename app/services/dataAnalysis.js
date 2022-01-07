// import
const db = require("./db");
const helper = require("../helper");
const realestate = require("./realestates");

// function to get recommendations for user
async function getRecommendations(req) {

  // get user
  let user = req.user;
  const getUserId =
    "SELECT Id FROM users WHERE Name = '" + user.username + "'";

  // get ids of recommendations
  const getAllInterests =
    "SELECT Real_Estate_Id FROM recommendations WHERE Customer_Id = (" + getUserId + ")"; // get all real estates which might be of interest for the user
  const rows = await db.query(getAllInterests);

  const ids = helper.emptyOrRows(rows);
  let data = [];

  // get real estate data
  for (let i = 0; i < ids.length; i++) {

    // set parameter
    let params = [];
    params.params = [];
    params.params.id = ids[i].Real_Estate_Id;

    let element = (await realestate.getSingle(params, true)).data[0]; // get real estate

    data.push(element); // add real estate to data
  }

  return {
    data
  };
}

// function to calculate recommendations
// based on search, click, context and favourite data
async function calculateRecommendations(user) {

  // user id
  const userIdSql = "SELECT Id FROM users WHERE Name = '" + user.username + "'";
  let userId = await db.query(userIdSql);

  if (userId.length < 1) {
    return { "error": "User does not exist" };
  }

  userId = userId[0].Id;

  // delete all old recommendations
  const deleteRecommendations = "DELETE FROM recommendations where Customer_Id = " + userId;
  await db.query(deleteRecommendations);

  // search data
  const serachSql = "SELECT * FROM searches where Customer_Id = " + userId;
  let searchData = await db.query(serachSql);

  // click data
  let clickData = [];
  await GetData("clicks", userId, clickData);

  // context data
  let contextData = [];
  await GetData("contexts", userId, contextData);

  // favourite data
  let favouriteData = [];
  await GetData("favourites", userId, favouriteData);

  // search result initialisation
  let searchResult = {};
  searchResult.City = {};
  searchResult.Price = 0;
  searchResult.Size = 0;
  searchResult.RoomNumber = 0;
  searchResult.Balcony = 0;
  searchResult.Garden = 0;
  searchResult.Garage = 0;
  searchResult.Furnished = 0;
  searchResult.InternetService = 0;
  searchResult.InternetSpeed = 0;
  searchResult.OfferMethod = 0;
  searchResult.CityCounter = 0;
  searchResult.PriceCounter = 0;
  searchResult.SizeCounter = 0;
  searchResult.RoomNumberCounter = 0;
  searchResult.BalconyCounter = 0;
  searchResult.GardenCounter = 0;
  searchResult.GarageCounter = 0;
  searchResult.FurnishedCounter = 0;
  searchResult.InternetServiceCounter = 0;
  searchResult.InternetSpeedCounter = 0;
  searchResult.OfferMethodCounter = 0;

  // count search data
  for (let i = 0; i < searchData.length; i++) {
    let searchElement = searchData[i];

    // city
    if (searchElement.City && searchElement.City !== 'NULL') {
      if (searchElement.City in searchResult.City) {
        searchResult.City[searchElement.City]++; // add entry
      }
      else {
        searchResult.City[searchElement.City] = 1; // create entry
      }

      searchResult.CityCounter++;
    }

    // price
    if (searchElement.Price && searchElement.Price !== 'NULL') {
      searchResult.Price += searchElement.Price;
      searchResult.PriceCounter++;
    }

    // size
    if (searchElement.Size && searchElement.Size !== 'NULL') {
      searchResult.Size += searchElement.Size;
      searchResult.SizeCounter++;
    }

    // room number
    if (searchElement.Room_Number && searchElement.Room_Number !== 'NULL') {
      searchResult.RoomNumber += searchElement.Room_Number;
      searchResult.RoomNumberCounter++;
    }

    // balcony
    if (searchElement.Balcony && searchElement.Balcony !== 'NULL') {
      searchResult.Balcony += searchElement.Balcony;
    }

    // garden
    if (searchElement.Garden && searchElement.Garden !== 'NULL') {
      searchResult.Garden += searchElement.Garden;
    }

    // garage
    if (searchElement.Garage && searchElement.Garage !== 'NULL') {
      searchResult.Garage += searchElement.Garage;
    }

    // furnished
    if (searchElement.Furnished && searchElement.Furnished !== 'NULL') {
      searchResult.Furnished += searchElement.Furnished;
    }

    // internet service
    if (searchElement.Internet_Service && searchElement.Internet_Service !== 'NULL') {
      searchResult.InternetService += searchElement.Internet_Service;
    }

    // internet speed
    if (searchElement.Internet_Speed && searchElement.Internet_Speed !== 'NULL') {
      searchResult.InternetSpeed += searchElement.Internet_Speed;
      searchResult.InternetSpeedCounter++;
    }

    // offer method
    if (searchElement.Offer_Method && searchElement.Offer_Method !== 'NULL') {
      searchResult.OfferMethod += searchElement.Offer_Method;
      searchResult.OfferMethodCounter++;
    }

    searchResult.BalconyCounter++;
    searchResult.GardenCounter++;
    searchResult.GarageCounter++;
    searchResult.FurnishedCounter++;
    searchResult.InternetServiceCounter++;
  }

  // click result
  let clickResult = {};
  CountData(clickData, clickResult);

  // context result
  let contextResult = {};
  CountData(contextData, contextResult);

  // favourite result
  let favouriteResult = {};
  CountData(favouriteData, favouriteResult);

  // weight factors for data sources
  let searchFactor = 1.5;
  let clickFactor = 2;
  let contextFactor = 10;
  let favouriteFactor = 8;

  // multpiply values with factors
  MultiplyResult(searchResult, searchFactor);
  MultiplyResult(clickResult, clickFactor);
  MultiplyResult(contextResult, contextFactor);
  MultiplyResult(favouriteResult, favouriteFactor);

  // data result
  dataResult = {};
  // city
  dataResult.City = searchResult.City;
  AddCityData(clickResult, dataResult.City); // add click result for city
  AddCityData(contextResult, dataResult.City); // add context result for city
  AddCityData(favouriteResult, dataResult.City); // add favourite result for city
  for (let element in dataResult.City) { // devide by number of elements which have to be multiplied by factor
    dataResult.City[element] /= (searchResult.CityCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  }
  // calculate data result values for all other attributes
  dataResult.Price = (searchResult.Price + clickResult.Price + contextResult.Price + favouriteResult.Price) / (searchResult.PriceCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.Size = (searchResult.Size + clickResult.Size + contextResult.Size + favouriteResult.Size) / (searchResult.SizeCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.RoomNumber = (searchResult.RoomNumber + clickResult.RoomNumber + contextResult.RoomNumber + favouriteResult.RoomNumber) / (searchResult.RoomNumberCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.Balcony = (searchResult.Balcony + clickResult.Balcony + contextResult.Balcony + favouriteResult.Balcony) / (searchResult.BalconyCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.Garden = (searchResult.Garden + clickResult.Garden + contextResult.Garden + favouriteResult.Garden) / (searchResult.GardenCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.Garage = (searchResult.Garage + clickResult.Garage + contextResult.Garage + favouriteResult.Garage) / (searchResult.GarageCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.Furnished = (searchResult.Furnished + clickResult.Furnished + contextResult.Furnished + favouriteResult.Furnished) / (searchResult.FurnishedCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.InternetService = (searchResult.InternetService + clickResult.InternetService + contextResult.InternetService + favouriteResult.InternetService) / (searchResult.InternetServiceCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.InternetSpeed = (searchResult.InternetSpeed + clickResult.InternetSpeed + contextResult.InternetSpeed + favouriteResult.InternetSpeed) / (searchResult.InternetSpeedCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);
  dataResult.OfferMethod = (searchResult.OfferMethod + clickResult.OfferMethod + contextResult.OfferMethod + favouriteResult.OfferMethod) / (searchResult.OfferMethodCounter + clickData.length * clickFactor + contextData.length * contextFactor + favouriteData.length * favouriteFactor);

  // attribute weights
  let cityFactor = 3;
  let priceFactor = 2;
  let sizeFactor = 2;
  let roomNumberFactor = 0.2;
  let balconyFactor = 0.5;
  let gardenFactor = 0.5;
  let garageFactor = 0.5;
  let furnishedFactor = 0.5;
  let internetServiceFactor = 0.2;
  let internetSpeedFactor = 0.2;
  let offerMethodFactor = 4;

  // get all available real estates
  let req = [];
  req.query = [];
  let avialableRealEstates = (await realestate.getMultiple(req)).data;

  // compare attribute values with data result
  for (let i = 0; i < avialableRealEstates.length; i++) {
    let object = avialableRealEstates[i];

    // calculate differences and multiply by attribute factor
    let recommendation = {};
    recommendation.City = (1 - ((object.City in dataResult.City ? dataResult.City[object.City] : 0) + (object.Postcode in dataResult.City ? dataResult.City[object.Postcode] : 0))) * cityFactor; // add values for city and postcode, subtract sum from 1
    recommendation.Price = Math.abs(object.Price - dataResult.Price) / 500000 * priceFactor; // scale difference
    recommendation.Size = Math.abs(object.Size - dataResult.Size) / 500 * sizeFactor; // scale difference
    recommendation.RoomNumber = Math.abs(object.Room_Number - dataResult.RoomNumber) / 10 * roomNumberFactor;
    recommendation.Balcony = Math.abs(object.Balcony - dataResult.Balcony) * balconyFactor;
    recommendation.Garden = Math.abs(object.Garden - dataResult.Garden) * gardenFactor;
    recommendation.Garage = Math.abs(object.Garage - dataResult.Garage) * garageFactor;
    recommendation.Furnished = Math.abs(object.Furnished - dataResult.Furnished) * furnishedFactor;
    recommendation.InternetService = Math.abs(object.Internet_Service - dataResult.InternetService) * internetServiceFactor;
    recommendation.InternetSpeed = Math.abs(object.Internet_Speed - dataResult.InternetSpeed) / 100 * internetSpeedFactor; // scale difference
    recommendation.OfferMethod = Math.abs(object.Offer_Method - dataResult.OfferMethod) * offerMethodFactor;

    // add all part sums
    let objectValue = 0;
    for (let element in recommendation) {
      objectValue += recommendation[element];
    }

    // barrier
    let barrier = 2.0;

    // if barrrier is exceeded, real estate will be added to recommendations
    // check if real estate is already in contexts or favourites
    if (objectValue <= barrier && !contextData.find(element => element.Id === object.Id) && !favouriteData.find(element => element.Id === object.Id)) {
      let insertRecommandation = "INSERT INTO recommendations(Customer_Id,Real_Estate_Id) VALUES(" + userId + "," + object.Id + ")";
      await db.query(insertRecommandation);
    }
  }
}

// function to get the real estate data from different database tables
async function GetData(tablename, userId, data) {
  // get ids
  const getIdsSql = "SELECT Real_Estate_Id FROM " + tablename + " where Customer_Id = " + userId;
  let realestateIds = await db.query(getIdsSql);

  for (let i = 0; i < realestateIds.length; i++) {

    // set parameters
    let params = [];
    params.params = [];
    params.params.id = realestateIds[i].Real_Estate_Id;

    let element = (await realestate.getSingle(params, false)).data[0]; // get real estate data

    data.push(element); // add real estate
  }
}

// function to count data from source
function CountData(data, result) {

  // initialise result
  result.City = {};
  result.Price = 0;
  result.Size = 0;
  result.RoomNumber = 0;
  result.Balcony = 0;
  result.Garden = 0;
  result.Garage = 0;
  result.Furnished = 0;
  result.InternetService = 0;
  result.InternetSpeed = 0;
  result.OfferMethod = 0;

  // add values of each element to result
  for (let i = 0; i < data.length; i++) {
    let element = data[i];

    if (element.City in result.City) {
      result.City[element.City]++; // increment entry
    }
    else {
      result.City[element.City] = 1; // create entry
    }

    result.Price += (element.Price + element.Additional_Costs);
    result.Size += element.Size;
    result.RoomNumber += element.Room_Number;
    result.Balcony += element.Balcony;
    result.Garden += element.Garden;
    result.Garage += element.Garage;
    result.Furnished += element.Furnished;
    result.InternetService += element.Internet_Service;
    result.InternetSpeed += element.Internet_Speed;
    result.OfferMethod += element.Offer_Method;
  }
}

// function to multiply attribute values by factor
function MultiplyResult(result, factor) {
  // city values
  for (let element in result.City) {
    result.City[element] *= factor;
  }
  // all other attributes
  for (let element in result) {
    if (element !== "City") {
      result[element] *= factor;
    }
  }
}

// function to add all city elemets
function AddCityData(data, city) {
  for (let element in data.City) {
    if (element in city) {
      city[element] += data.City[element]; // add value to entry
    }
    else {
      city[element] = data.City[element]; // create new entry
    }
  }
}

// export
module.exports = {
  getRecommendations,
  calculateRecommendations
};
