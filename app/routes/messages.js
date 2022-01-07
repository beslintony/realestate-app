const express = require('express');
const router = express.Router();
const message = require('../services/messages');
const helper = require('../helper');

router.get('/', async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer" || req.user.role == "Agent") {
        res.json(await message.getMultiple(req.user)); // get all contexts (communication partner regarding the real estate)
      }
      else {
        res.status(403).end();
      }
    }
    else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting messages, message: `, err.message);
    next(err);
  }
});

router.get('/check/', async function (req, res, next) {
  try {
    const errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer" || req.user.role == "Agent") {
        const result = await message.check(req.user); // check new messages after login
        res.json(result);
      }
      else {
        res.status(403).end();
      }
    }
    else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting messages, message: `, err.message);
    next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer" || req.user.role == "Agent") {
        const data = await message.getSingle(req); // get messages of one context

        if (data.data.error) {
          res.status(404).json(data);
        }
        else {
          res.status(200).json(data);
        }
      }
      else {
        res.status(403).end();
      }

    }
    else {
      res.status(errorCode).end();
    }

  } catch (err) {
    console.error(`Error while getting context with id = ${req.params.id}, message: ${err.message}`);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer") {
        res.json(await message.create(req)); // create new context
      }
      else {
        res.status(403).end();
      }
    }
    else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while creating context, message: `, err.message);
    next(err);
  }
});

router.post('/:id', async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Customer" || req.user.role == "Agent") {
        var val = await message.insert(req); // send message

        if (!val.error) {
          res.status(200).end();
        }
        else {
          res.status(410).json(val);
        }
      }
      else {
        res.status(403).end();
      }
    }
    else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while inserting message, message: `, err.message);
    next(err);
  }
});

module.exports = router;
