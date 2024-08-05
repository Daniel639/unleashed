const router = require('express').Router();

// GET all comments
router.get('/', (req, res) => {
  res.send('GET all comments');
});

// POST a new comment
router.post('/', (req, res) => {
  res.send('POST a new comment');
});


module.exports = router;