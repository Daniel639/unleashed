const router = require('express').Router();
const homeRoutes = require('./homeroutes');
const apiRoutes = require('./api');
const uploadController = require('./uploadController');

// Use homeRoutes for root path and login
router.use('/', homeRoutes);

// API routes
router.use('/api', apiRoutes);

// Upload route (consider moving this to API routes if it's an API endpoint)
router.use('/api/upload', uploadController);

// Catch-all for any other routes
router.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = router;