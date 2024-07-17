const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_dwvbaz9ap,
    api_key: process.env.CLOUDINARY_376353583468474,
    api_secret: process.env.CLOUDINARY_HD6DAEFF_luY4kiE0DaS9degH1E
});

module.exports = cloudinary;