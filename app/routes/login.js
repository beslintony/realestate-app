const express = require('express');
const router = express.Router();
const login = require('../services/login');

router.post('/', async function (req, res, next) {
  try {
    const data = await login.check(req.body.username, req.body.password); // check username and password

    if (data.error) {
      res.status(401).json(data);
    }
    else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(`Error while checking user, message: `, err.message);
    next(err);
  }
});

module.exports = router;
