const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const playdateRoutes = require('./playdateRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/playdates', playdateRoutes);

module.exports = router;
