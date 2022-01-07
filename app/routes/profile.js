const express = require('express');
const router = express.Router();
const profile = require('../services/profile');
const helper = require('../helper');
const images = require("../services/images");

router.get('/', async function(req, res, next) {
  try {
    var errorCode = helper.authenticateJWT(req);

    if (!errorCode){
      if(req.user.role == "Agent"){
        res.json(await profile.getAgent(req.user)); // get agent data
      }else{
        res.json(await profile.getUser(req.user)); // get user data
      }
    }
    else{
      res.status(errorCode).end();
    }
  } catch (err) {
    console.error(`Error while getting profile:`, err.message);
    next(err);
  }
});


router.put('/password', async function(req,res,next){
  try{
    var errorCode = helper.authenticateJWT(req);
	
    if (!errorCode){
			res.json(await profile.updatePassword(req)); // update password
    }else{
      res.status(errorCode).end();
	}
  }catch (err){
    console.error(`Error while updating profile password:`, err.message);
    next(err)
  }
});

router.put('/picture', images.uploadSingle, images.resize, async function(req,res,next){
  try{

    var errorCode = helper.authenticateJWT(req);
	
    if (!errorCode){
			res.json(await profile.updatePicture(req)); // update profile picture
    }else{
      res.status(errorCode).end();
	}
  }catch (err){
    console.error(`Error while updating profile picture:`, err.message);
    next(err)
  }
});

module.exports = router;
