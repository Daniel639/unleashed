require('dotenv').config(); // Load environment variables from .env
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env["dwvbaz9ap"], 
  api_key: process.env.CLOUDINARY_API_KEY || process.env["376353583468474"], 
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env["HD6DAEFF_luY4kiE0DaS9degH1E"]
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pet_images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
  }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload }; 
