const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/home', (req, res) => {
    console.log("Hit Home Route");
    res.render('home');
});



module.exports = router;