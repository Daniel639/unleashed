require('dotenv').config(); // Load environment variables from .env
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pet_images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };