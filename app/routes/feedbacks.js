const express = require("express");
const router = express.Router();
const rating = require("../services/feedbacks");
const helper = require("../helper");

// create feedback using post method
router.post("/", async function (req, res, next) {
  try {
    const errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      // checks for user role
      if (req.user.role === "Customer") {
        (await rating.create(req))
          ? res.status(200).end()
          : res.status(500).end();
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while adding feedbacks, message: `, err.message);
    next(err);
  }
});

// edit a feedback using put
router.put("/:id", async function (req, res, next) {
  try {
    const errorCode = helper.authenticateJWT(req);
    if (!errorCode) {
      // checks for user role
      if (req.user.role === "Customer") {
        res.json(await rating.edit(req));
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while editing feedbacks, message: `, err.message);
    next(err);
  }
});

// deletes a feedback
router.delete("/delete/:id", async function (req, res, next) {
  try {
    const errorCode = helper.authenticateJWT(req);
    if (!errorCode) {
      // checks for user role
      if (req.user.role === "Customer") {
        res.json(await rating.deleteFeedback(req)).end();
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while deleting feedbacks, message: `, err.message);
    next(err);
  }
});

// get all feedbacks for the current agentId
router.get("/:agentId", async function (req, res, next) {
  try {
    const data = await rating.getAgentFeedbacks(req.params); // get all feedback for agentId
    if (data.length) {
      res.status(200).json(data);
    } else res.status(404).end();
  } catch (err) {
    console.error(`Error while getting feedbacks, message: `, err.message);
    next(err);
  }
});
// get the feedback of the customer for the currrent agentId: id
router.get("/user/:id", async function (req, res, next) {
  try {
    const errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      // checks for user role
      if (req.user.role == "Customer") {
        const data = await rating.getCustomerFeedback(req.params, req.user); // get customer feedback for customerId
        if (data.length) {
          res.status(200).json(data);
        } else res.status(404).end();
      } else {
        res.status(403).end();
      }
    } else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting feedbacks, message: `, err.message);
    next(err);
  }
});

// get all the agent basic details including average Rating for the current agentId
router.get("/agent/:agentId", async function (req, res, next) {
  try {
    const data = await rating.getAverageRating(req.params); // get average rating from feedback for agentId
    if (data.length) {
      res.status(200).json(data).end();
    } else res.status(404).end();
  } catch (err) {
    console.error(`Error while getting average rating, message: `, err.message);
    next(err);
  }
});

module.exports = router;
