const express = require("express");
const router = express.Router();
const dashboard = require("../services/agentOverview");
const helper = require("../helper");

router.get("/", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Agent") {
        res.json(await dashboard.getMultiple(req)); // get overview of all realestates of agent
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
      if (req.user.role == "Agent") {
        const data = await dashboard.getSingle(req); // get special realestate of agent
        if (data.data.length) {
          res.json(await dashboard.getSingle(req));
        } else {
          res
            .status(404)
            .json({ error: "You can't update the property / realestate" });
        }
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting real estate, message: `, err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Agent") {
        res.json(await dashboard.del(req)); // set realestate to status delete
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while deleting real estate, message: `, err.message);
    next(err);
  }
});

router.post("/:id", async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Agent") {
        var val = await dashboard.sell(req); // sell realestate

        if (!val.error) {
          res.status(200).end();
        } else {
          res.status(404).json(val);
        }
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while selling real estate, message: `, err.message);
    next(err);
  }
});

module.exports = router;
