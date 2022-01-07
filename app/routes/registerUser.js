const express = require('express');
const router = express.Router();
const registerUser = require('../services/registerUser');
const images = require("../services/images");

router.post('/', images.uploadSingle, images.resize, async function(req, res, next) {
  try {
    const data = await registerUser.insert(req.body); // register user

    if (data.error)
    {
      res.status(409).json(data);
    }
    else
    {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(`Error while inserting user, message: `, err.message);
    next(err);
  }
});

module.exports = router;
