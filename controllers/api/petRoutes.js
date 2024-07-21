const express = require('express');
const router = express.Router();
const { upload } = require('../../config/cloudinary');

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ file: req.file });
});

module.exports = router;