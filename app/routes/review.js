const express = require("express");
const router = express.Router();
const review = require("../services/review");
const helper = require("../helper");
const { response } = require("express");

router.get("/", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Administrator") {
        res.json(await review.getMultiple(req)); // get all realestates with review status
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting real estates, message: `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Administrator") {
        const data = await review.getSingle(req); // get data of review real estate
        if (data.data.length) {
          res.status(200).json(data);
        } else {
          res.status(410).end();
        }
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(
      `Error while getting real estate with id = ${req.params.id}, message: ${err.message}`
    );
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Administrator") {
        res.json(await review.evaluate(req)); // accept or decline real estate
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(
      `Error while evaluatiting real estate, message: `,
      err.message
    );
    next(err);
  }
});

module.exports = router;
