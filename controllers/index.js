//const express = require('express');
//const app = express();

const router = require('express').Router();

const homeRoutes = require('./homeroutes');
const apiRoutes = require('./apiroutes');

router.use('/',homeRoutes);
router.use('/api', apiRoutes)

module.exports = router;