const router = require('express').Router();
const homeRoutes = require('./homeroutes');
const petRoutes = require('./api/petRoutes');
const playDateRoutes = require('./playDateRoutes');
const uploadController = require('./uploadController');

// Use homeRoutes for root path and login
router.use('/', homeRoutes);

// API routes
router.use('/api/pets', petRoutes);
router.use('/api/playdates', playDateRoutes);
router.use('/api/upload', uploadController);

// Catch-all for any other routes
router.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = router;