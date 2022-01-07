const express = require('express');
const router = express.Router();
const helper = require('../helper');

router.post('/', async function(req, res, next) {
  try {

    var errorCode = helper.authenticateJWT(req);

    if (!errorCode)
    {
      helper.setRefreshTokens(helper.getRefreshTokens().filter(t => t !== req.body.refreshToken)); //remove refreash token

      res.status(200).json("Logout successful");
    }
    else
    {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while logging out user, message: `, err.message);
    next(err);
  }
});

module.exports = router;
