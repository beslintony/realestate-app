const express = require('express');
const router = express.Router();
const companies = require('../services/companies');

router.get('/', async function(req, res, next) {
  try {
    const data = await companies.getMultiple(); // get overview of all companies

    if (data.error)
    {
      res.status(409).json(data);
    }
    else
    {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(`Error while getting companies, message: `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const data = await companies.getSingle(req.params.id); // get single company overview

    if (data.error)
    {
      res.status(409).json(data);
    }
    else
    {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(`Error while getting company, message: `, err.message);
    next(err);
  }
});

module.exports = router;
