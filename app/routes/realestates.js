const express = require("express");
const router = express.Router();
const realestate = require("../services/realestates");
const helper = require("../helper");
const images = require("../services/images");

router.get("/", async function (req, res, next) {
  try {
    helper.authenticateJWT(req);

    res.json(await realestate.getMultiple(req)); // get all available real estates
  } catch (err) {
    console.error(`Error while getting real estates, message: `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    helper.authenticateJWT(req);

    const data = await realestate.getSingle(req, true); // get one real estate

    if (data.data.error) {
      res.status(404).json(data);
    }
    else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(
      `Error while getting real estate with id = ${req.params.id}, message: ${err.message}`
    );
    next(err);
  }
});

router.post('/', images.uploadMultiple, images.resize, async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Agent") {
        const id = await realestate.create(req); // create new real estate
        await images.insert(req.body.images, id); // insert images for real estate

        res.status(200).end();
      }
      else {
        res.status(403).end();
      }
    }
    else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while creating real estate, message: `, err.message);
    next(err);
  }
});

router.put('/:id', images.uploadMultiple, images.resize, async function (req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode) {
      if (req.user.role == "Agent") {
        await realestate.edit(req); // edit realestate data
        await images.remove(req.params.id); // remove old images
        await images.insert(req.body.images, req.params.id); // insert new images

        res.status(200).end();
      }
      else {
        res.status(403).end();
      }
    }
    else {
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while creating real estate, message: `, err.message);
    next(err);
  }
});

module.exports = router;
