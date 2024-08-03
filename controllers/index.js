const router = require('express').Router();
const homeRoutes = require('./homeroutes');
<<<<<<< HEAD
const petRoutes = require('./api/petRoutes');
const playDateRoutes = require('./api/playDateRoutes');
=======
const apiRoutes = require('./api');
>>>>>>> 1742b42aace0592200a2be90a4f4a1e11c4b8f29
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