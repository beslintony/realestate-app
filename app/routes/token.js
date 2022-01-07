const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helper = require('../helper');

router.post('/', async function (req, res, next) {
  try {
    const refreshToken = req.body.token;

    // check if token exists
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    // check if refresh token list contains refresh token
    if (!helper.getRefreshTokens().includes(refreshToken)) {
      return res.sendStatus(403);
    }

    // verify token
    jwt.verify(refreshToken, helper.getRefreshTokenSecret(), (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign({ username: user.username, role: user.role }, helper.getAccessTokenSecret(), { expiresIn: '60m' }); // create new access token

      res.json({
        accessToken
      });
    });
  } catch (err) {
    console.error(`Error while refreshing token, message: `, err.message);
    next(err);
  }
});

module.exports = router;
