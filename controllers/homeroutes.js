const router = require('express').Router();
const User = require('../models/user');
const Pet = require ('../models/pet');

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
// New router for editing a pet 
router.get('/edit/:id', (req, res) => {
    console.log("Hit Edit Pet Route");
    console.log("Pet ID:", req.params.id);
    
    Pet.findByPk(req.params.id)
        .then(petData => {
            if (!petData) {
                console.log("No pet found with this id");
                res.status(404).json({ message: 'No pet found with this id!' });
                return;
            }
            const pet = petData.get({ plain: true });
            console.log("Pet data:", pet);
            res.render('edit', { pet });
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json(err);
        });
});

router.post('/update-pet/:id', (req, res) => {
    console.log("Hit Update Pet Route");
    console.log("Pet ID:", req.params.id);
    console.log("Update Data:", req.body);

    Pet.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then(petData => {
        if (!petData[0]) {
            res.status(404).json({ message: 'No pet found with this id!' });
            return;
        }
        res.redirect('/profile');  // Adjust this to your profile route
    })
    .catch(err => {
        console.log("Error:", err);
        res.status(500).json(err);
    });
});

module.exports = router;