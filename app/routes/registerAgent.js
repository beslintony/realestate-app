const express = require('express');
const router = express.Router();
const registerAgent = require('../services/registerAgent');
const images = require("../services/images");

router.post('/', images.uploadSingle, images.resize, async function (req, res, next) {
  try {
    const data = await registerAgent.insert(req.body); // register agent

    if (data.usererror) {
      res.status(409).json(data);
    }
    else if (data.verificationerror) {
      res.status(401).json(data);
    }
    else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(`Error while inserting agent, message: `, err.message);
    next(err);
  }
});

module.exports = router;
