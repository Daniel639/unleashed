const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/home', (req, res) => {
    console.log("Hit Home Route");
    res.render('home');
});

router.get('/profile/:name', (req, res) => {
    console.log("Request Params Object: ", req.params)  // { name: }
    console.log("Hit Profile Route");
    res.render('profile');
});

router.post(`/submit-form`, (req,res) => {
    // We want to capture the INCOMING data from our Profile VIEW
    console.log("Incoming Data: ", req.body);
    const { firstName, lastName, username, password } = req.body
    // Create a temp user 
    let newUser = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password
    }
    console.log("New User: ", newUser)
    // WE want to send that data to our User's database table
    User.create(newUser)
        .then(data => {
            console.log("data: ", data.dataValues);
            // We need to determine HoW and or WHAT we RESPONSE back to the VIEW/frontend
           // res.status(301).json({ messege: "New User Created!"})
            res.redirect('/home')
        })
        .catch(err => {
            console.log("error: ", err)
        });
});




module.exports = router;