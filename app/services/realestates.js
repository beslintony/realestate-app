const db = require("./db");
const helper = require("../helper");

async function getMultiple(req) {
  function buildQuery(params) {
    // function to set all conditions for filter
    var conditions = [];
    var values = [];

    // city
    if (typeof params.city !== "undefined") {
      conditions.push("(City LIKE ? OR Postcode LIKE ?)");
      values.push(params.city + "%");
      values.push(params.city + "%");
    }

    // garden
    if (typeof params.garden !== "undefined") {
      conditions.push("Garden = ?");
      values.push(parseInt(params.garden));
    }

    // garage
    if (typeof params.garage !== "undefined") {
      conditions.push("Garage = ?");
      values.push(parseInt(params.garage));
    }

    // balcony
    if (typeof params.balcony !== "undefined") {
      conditions.push("Balcony = ?");
      values.push(parseInt(params.balcony));
    }

    // internet service
    if (typeof params.internetService !== "undefined") {
      conditions.push("Internet_Service = ?");
      values.push(parseInt(params.internetService));
    }

    // furnished
    if (typeof params.furnished !== "undefined") {
      conditions.push("Furnished = ?");
      values.push(parseInt(params.furnished));
    }

    // price (min and max)
    if (
      typeof params.minPrice !== "undefined" &&
      typeof params.maxPrice !== "undefined"
    ) {
      conditions.push("Price BETWEEN ? AND ?");
      values.push(parseInt(params.minPrice));
      values.push(parseInt(params.maxPrice));
    }

    // area (min and max)
    if (
      typeof params.minArea !== "undefined" &&
      typeof params.maxArea !== "undefined"
    ) {
      conditions.push("Size BETWEEN ? AND ?");
      values.push(parseInt(params.minArea));
      values.push(parseInt(params.maxArea));
    }

    if (typeof params.offerMethod !== "undefined") {
      if (params.offerMethod == "sale") {
        params.offerMethod = 1;
      } else {
        params.offerMethod = 2;
      }
      conditions.push("Offer_Method = ?");
      values.push(parseInt(params.offerMethod));
    }

    // check if real estate is available
    conditions.push("Status_Id = ?");
    values.push(3);

    // combine constraints
    return {
      where: conditions.length ? conditions.join(" AND ") : "1",
      values: values,
    };
  }

  let params = req.query;
  let user = req.user;

  var conditions = buildQuery(params);
  var sql = "SELECT * FROM realestates WHERE " + conditions.where;

  // sorting
  if (typeof params.sorting !== "undefined") {
    switch (parseInt(params.sorting)) {
      case 1:
        sql += " ORDER BY Price ASC";
        break;
      case 2:
        sql += " ORDER BY Price DESC";
        break;
      case 3:
        sql += " ORDER BY Size ASC";
        break;
      case 4:
        sql += " ORDER BY Size DESC";
        break;
      default:
        sql += " ORDER BY Price ASC";
        break;
    }
  }

  const rows = await db.query(sql, conditions.values); // get all realestates

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

    // get agent
    sql =
      "SELECT name FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = " +
      element.Agent_Id +
      ")";
    let agent = await db.query(sql);
    element.Agent = agent[0].name;
    element.AgentPicture = agent[0].picture;

    sql = "SELECT * FROM agents WHERE Id = " + element.Agent_Id;
    agent = await db.query(sql);
    element.CompanyId = agent[0].Company_Id;

    //get company
    sql = "SELECT * FROM companies WHERE ID = " + element.CompanyId;
    var company = await db.query(sql);
    element.CompanyName = company[0].Name;
  }

  // data analysis
  // add entry to search table
  if (user && user.role == "Customer") {
    let userId = "SELECT Id FROM users WHERE Name = '" + user.username + "'";

    const insertSearchEntry =
      "INSERT INTO searches(City,Price,Size,Room_Number,Balcony,Garden,Garage,Furnished,Internet_Service,Internet_Speed,Offer_Method,Customer_Id)" +
      " VALUES(" +
      (typeof params.city !== "undefined"
        ? "'" + params.city + "'"
        : 'NULL') +
      "," +
      (typeof params.minPrice !== "undefined" &&
        typeof params.maxPrice !== "undefined"
        ? ((parseFloat(params.maxPrice) === 1000000 && params.offerMethod === 1) ||
          (parseFloat(params.maxPrice) === 10000 && params.offerMethod === 2)) &&
          parseFloat(params.minArea) === 0
          ? "NULL"
          : (parseInt(params.maxPrice) + parseInt(params.minPrice)) / 2
        : "NULL") +
      "," +
      (typeof params.minArea !== "undefined" &&
        typeof params.maxArea !== "undefined"
        ? parseFloat(params.maxArea) === 5000 &&
          parseFloat(params.minArea) === 0
          ? "NULL"
          : (parseFloat(params.maxArea) + parseFloat(params.minArea)) / 2
        : "NULL") +
      "," +
      (typeof params.roomNumber !== "undefined" ? params.roomNumber : "NULL") +
      "," +
      (typeof params.balcony !== "undefined" ? params.balcony : "NULL") +
      "," +
      (typeof params.garden !== "undefined" ? params.garden : "NULL") +
      "," +
      (typeof params.garage !== "undefined" ? params.garage : "NULL") +
      "," +
      (typeof params.furnished !== "undefined" ? params.furnished : "NULL") +
      "," +
      (typeof params.internetService !== "undefined"
        ? params.internetService
        : "NULL") +
      "," +
      (typeof params.internetSpeed !== "undefined"
        ? params.internetSpeed
        : "NULL") +
      "," +
      (typeof params.offerMethod !== "undefined"
        ? params.offerMethod
        : "NULL") +
      "," +
      "(" +
      userId +
      "))";

    await db.query(insertSearchEntry);
  }

  return {
    data,
  };
}

async function getSingle(req, statusRestriction) {
  let params = req.params;
  let user = req.user;

  var sql =
    "SELECT * FROM realestates WHERE Id = " +
    params.id +
    (statusRestriction ? " AND Status_Id = 3" : ""); // get one real estate

  const rows = await db.query(sql);

  let data = helper.emptyOrRows(rows);

  if (data.length === 0) {
    data = { error: "real estate is not available" };
  } else {
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

      // get agent
      sql =
        "SELECT name,picture FROM users WHERE Id = (SELECT User_Id FROM agents WHERE Id = " +
        element.Agent_Id +
        ")";
      let agent = await db.query(sql);
      element.Agent = agent[0].name;
      element.AgentPicture = agent[0].picture;

      sql = "SELECT * FROM agents WHERE Id = " + element.Agent_Id;
      agent = await db.query(sql);
      element.CompanyId = agent[0].Company_Id;

      // get company
      sql = "SELECT * FROM companies WHERE ID = " + element.CompanyId;
      let company = await db.query(sql);
      element.CompanyName = company[0].Name;
    }

    // data analysis
    // add entry to click table
    if (user && user.role == "Customer") {
      let userId = "SELECT Id FROM users WHERE Name = '" + user.username + "'";

      const insertClickEntry =
        "INSERT INTO clicks(Real_Estate_Id,Customer_Id)" +
        " VALUES(" +
        params.id +
        "," +
        "(" +
        userId +
        "))";

      await db.query(insertClickEntry);
    }
  }

  return {
    data,
  };
}

async function create(params) {
  var User_Id =
    "SELECT Id FROM agents where User_Id = (SELECT Id FROM users WHERE Name = '" +
    params.user.username +
    "')";

  var offerMethod;

  // get offer method
  if (params.body.offerMethod == "sale") {
    offerMethod = 1;
  } else {
    offerMethod = 2;
  }

  var d = new Date();

  // insert values of realestate
  var createRealestate =
    "INSERT INTO realestates(Title,Street,House_Number,Postcode,City,Price,Additional_Costs,Size,Room_Number,Balcony,Garden,Garage,Furnished,Internet_Service,Internet_Speed,Description,Offer_Method,Agent_Id,Status_Id,Creation_Date)" +
    "VALUES ('" +
    params.body.title +
    "','" +
    params.body.street +
    "'," +
    params.body.houseNumber +
    ",'" +
    params.body.postcode +
    "','" +
    params.body.city +
    "'," +
    params.body.price +
    "," +
    params.body.additionalCosts +
    "," +
    params.body.area +
    "," +
    params.body.rooms +
    "," +
    params.body.balcony +
    "," +
    params.body.garden +
    "," +
    params.body.garage +
    "," +
    params.body.furnished +
    "," +
    params.body.internetService +
    "," +
    params.body.internetSpeed +
    ",'" +
    params.body.description +
    "'," +
    offerMethod +
    ",(" +
    User_Id +
    "),1,'" +
    d.toISOString().split("T")[0] +
    "')";

  const result = await db.query(createRealestate);

  return result.insertId;
}

async function edit(params) {
  var User_Id =
    "(SELECT Id FROM agents where User_Id = (SELECT Id FROM users WHERE Name = '" +
    params.user.username +
    "'))";

  var offerMethod;

  // get offer method
  if (params.body.offerMethod == "sale") {
    offerMethod = 1;
  } else {
    offerMethod = 2;
  }

  var d = new Date();

  // edit values of realestate
  var updateRealestate =
    "UPDATE realestates SET Title = '" +
    params.body.title +
    "',Street = '" +
    params.body.street +
    "',House_Number = " +
    params.body.houseNumber +
    ",Postcode = '" +
    params.body.postcode +
    "',City = '" +
    params.body.city +
    "',Price = " +
    params.body.price +
    ",Additional_Costs = " +
    params.body.additionalCosts +
    ",Size = " +
    params.body.area +
    ",Room_Number = " +
    params.body.rooms +
    ",Balcony = " +
    params.body.balcony +
    ",Garden = " +
    params.body.garden +
    ",Garage = " +
    params.body.garage +
    ",Furnished = " +
    params.body.furnished +
    ",Internet_Service = " +
    params.body.internetService +
    ",Internet_Speed = " +
    params.body.internetSpeed +
    ",Description = '" +
    params.body.description +
    "',Offer_Method = " +
    offerMethod +
    ",Status_Id = 1," +
    " Creation_Date = '" +
    d.toISOString().split("T")[0] +
    "' WHERE Agent_Id = " +
    User_Id +
    " AND Id = " +
    params.params.id;

  await db.query(updateRealestate);
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  edit,
};
