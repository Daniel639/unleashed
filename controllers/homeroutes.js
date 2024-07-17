const router = require('express').Router();
const User = require('../models/user');
const Pet = require ('../models/pet');
const bcrypt=require('bcrypt');

router.get('/', (req, res) => {
    res.render('login');
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/home', (req, res) => {
  res.render('home');
});
router.post('/submit-login-form', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    console.log("Hit login route");
    console.log(req.body);
    const {loginUsername, loginPassword} = req.body
    const userData = await User.findOne({ where: { username: req.body.loginUsername } });
    if (!userData) {
      return res.status(404).json({ message: 'Login failed. Please try again!', success: false });
    }
    const validPassword = await bcrypt.compare(req.body.loginPassword, userData.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Login failed. Please try again!', success: false });
    }
    return res.status(200).json({ message: 'Login successful', success: true, redirectUrl: '/home' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'An error occurred during login', success: false, error: err.message });
  }
});

router.get('/register', (req, res) => {
    console.log("Hit Register Route");
    res.render('register');
});

router.post('/submit-register-form', (req,res) => {
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

router.get('/', (req, res) => {
    res.render('home');
  });

module.exports = router;