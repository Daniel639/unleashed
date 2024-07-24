const router = require('express').Router();
const { cloudinary, upload } = require('../config/cloudinary');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    
    // Here you might want to save the Cloudinary URL to your database
    // For example, if it's a user's profile picture:
    // await User.findByIdAndUpdate(req.user.id, { profilePicture: result.secure_url });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Failed to upload image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;