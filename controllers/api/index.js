const router = require('express').Router();
const petRoutes = require('./petRoutes');
const postRoutes = require('./postRoutes');
<<<<<<< HEAD
const commentRoutes = require('./commentRoutes');
const playDateRoutes = require('./playDateRoutes');
=======
const commentRoutes = require('./commentRoutes.js');
const playdateRoutes = require('./playdateRoutes.js');
>>>>>>> 1742b42aace0592200a2be90a4f4a1e11c4b8f29

router.use('/pets', petRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/playdates', playDateRoutes);

module.exports = router;