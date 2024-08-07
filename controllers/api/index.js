const router = require('express').Router();
const petRoutes = require('./petRoutes');
// const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes.js');
const playdateRoutes = require('./playdateRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/pets', petRoutes);
// router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/playdates', playdateRoutes);
router.use('/users',userRoutes);

module.exports = router;