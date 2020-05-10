const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-west-1' //E.g us-east-1
});

const isValidFile = (file) => {
  return file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'|| file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/jpg'
  || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mp4' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/wma';
}

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  console.log('file in fileFilter', file);
  if (isValidFile(file)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'taylor-audio-books',
    key: function(req, file, cb) {
      console.log('file in upload', file);
      /*I'm using Date.now() to make sure my file has a unique name*/
      req.file = Date.now() + file.originalname;
      cb(null, Date.now() + file.originalname);
    }
  })
});

module.exports = upload;
