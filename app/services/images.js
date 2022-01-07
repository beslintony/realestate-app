const db = require("./db");
const path = require('path');
const {v4: uuidv4} = require('uuid'); 
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

//insert given images into database and connect it with the right realestate
async function insert(images, realestate_id) { 

  for (let i = 0; i < images.length; i++) {
    let insertQuery = `INSERT INTO realestateimages(Content, Real_Estate_Id) VALUES ('${images[i]}','${realestate_id}')`;

    await db.query(insertQuery);
  }
    
    return;
}

//delete all images of a given id
async function remove(id) {
  let getAllImages = `SELECT Content FROM realestateimages WHERE Real_Estate_Id = ${id}`;

  allImages = await db.query(getAllImages);

  for (let i = 0; i < allImages.length; i++)
  {
    let image = allImages[i];

    const path = 'public/images/' + image.Content;

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
      }
    })
  }

  let deleteQuery = `DELETE FROM realestateimages WHERE Real_Estate_Id = ${id}`;

  await db.query(deleteQuery);
  return;
}


//multer module to store uploaded files in memory
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, next) => {

  //check if only images are uploaded
  if (file.mimetype.startsWith("image")) {
    next(null, true);
  } else {
    next("Please upload only images.", false);
  }
};

//multer configuration
const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});


//upload multiple images at once
const uploadMultiple = (req,res,next) => {

  //define the number of images allowed
  const uploadFiles = multerUpload.array('images',10);

  uploadFiles (req, res, err => {
      if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
              console.error(`You tried to upload too many images.`);            
          }
          console.error(`Error during image upload`);
      }
      next();
    });
};


//upload a single image
const uploadSingle = (req,res,next) => {
    const uploadFile = multerUpload.array('images',1);

    uploadFile (req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                console.error(`You tried to upload too many images.`);            
            }
            console.error(`Error during image upload`);
        }
        next();
    });
};


//resize the images and save them in public/images/
const resize = async (req, res, next) => {
    if (!req.files) return next();

    //remove files from request field
    req.body.images = [];
    await Promise.all(
        req.files.map(async file => {

          //give each image a unique filename
          const filename = `${uuidv4()}.jpg`;
  
          //resize and save the image
          await sharp(file.buffer)
              .resize(640, 320)
              .toFormat("jpeg")
              .jpeg({ quality: 90 })
              .toFile(`public/images/${filename}`);
          
          //push the filename back into the request body
          req.body.images.push(filename);
        })
    );
    next();
};


const getResult = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }

  return res.send(req.body.images);
};

module.exports = {
    insert,
    uploadSingle,
    uploadMultiple,
    resize,
    getResult,
    remove
};