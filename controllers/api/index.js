const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const petRoutes = require('./petRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes.js');
const playdateRoutes = require('./playdateRoutes.js');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/playdates', playdateRoutes);

module.exports = router;