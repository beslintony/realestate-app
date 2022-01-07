const express = require('express');
const multer = require('multer');
const router = express.Router();
const images = require('../services/images');

router.post('/single', images.uploadSingle, images.resize, images.getResult);
router.post('/multiple', images.uploadMultiple, images.resize, images.getResult);

module.exports = router;