const express = require("express");
const router = express.Router();
const dataAnalysis = require("../services/dataAnalysis");
const helper = require("../helper");

router.post("/", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer") {
        res.status(200).json(await dataAnalysis.calculateRecommendations(req.user)); // calculate interesting real estates
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while calculating interesting real estates, message: `, err.message);
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer") {
        res.status(200).json(await dataAnalysis.getRecommendations(req)); // get all real estates which might be of interest
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting intersting real estates, message: `, err.message);
    next(err);
  }
});

module.exports = router;
