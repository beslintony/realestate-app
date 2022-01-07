const express = require("express");
const router = express.Router();
const favourites = require("../services/favourites");
const helper = require("../helper");


router.get("/", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer") {
        res.json(await favourites.getFavourite(req));
      }
    }
    else{
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting favourites:`, err.message);
    next(err);
  }
});


router.get("/checkfavourite/:realestateid", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer") {
        res.json(await favourites.checkFavourite(req));
      }
    }
    else{
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting favourites:`, err.message);
    next(err);
  } 
})


router.post("/:id", async function (req, res, next) {
  //create a favourite
  try{
    var errorCode = helper.authenticateJWT(req);
	
    if (!errorCode){
			res.json(await favourites.createFavourite(req)); 
    }else{
      res.status(errorCode).end();
	}
  }catch (err){
    console.error(`Error while adding a favourite:`, err.message);
    next(err)
  }
});


router.delete("/:id", async function (req, res, next) {
  //delete feedback
  try {
    const errorCode = helper.authenticateJWT(req);
    if (!errorCode) {
      if (req.user.role === "Customer") {
        res.json(await favourites.deleteFavourite(req));
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while deleting favourites, message: `, err.message);
    next(err);
  }
});

module.exports = router;
