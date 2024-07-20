const router = require('express').Router();
const User = require('../models/users');
const Pet = require ('../models/pets');
const bcrypt=require('bcrypt');
const userAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('login');
});
router.get('/profile', userAuth, (req, res) => {
    res.render('profile', {
        loggedIn: req.session.loggenIn
    });
});
router.get('/about', async (req, res) => {
    try { 
        await res.render('about', {
        loggedIn: req.session.loggenIn
    });
    } catch(err) {
        console.log("error: ", err)
    }
    });
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/home', async (req, res) => {
    try{
    const petsData= await Pet.findAll({ where: {user_id: req.session.user.id}});
    console.log(petsData);
    const pets = petsData.map((pet) => pet.get({ plain: true }));
    console.log(pets);
    res.render('home', {pets, loggedIn: req.session.loggenIn})
} catch(err) {
    console.log("error: ", err)
}
});
router.get('/edit', (req, res) => {
    res.render('edit', {
        loggedIn: req.session.loggenIn
    });
  });
  router.post('/submit-login-form', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      console.log("Hit login route");
      console.log(req.body);
      const userData = await User.findOne({ where: { username: req.body.loginUn } });
      if (!userData) {
        return res.status(404).json({ message: 'Login failed. Please try again!', success: false });
      }
      const validPassword = await userData.checkPassword(req.body.loginPw);
    // If checkPassword() evaluates as false, the user will receive an error message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.user=userData;
   console.log(userData);
      return req.session.save(()=>{
        req.session.loggenIn=true,
        res.redirect('/home')
        });
      
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'An error occurred during login', success: false, error: err.message });
    }
  });

router.get('/register', (req, res) => {
    console.log("Hit Register Route");
    res.render('register');
});
router.post('/submit-register-form',(req,res) => {
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
           //after user successfully registered - redirect to add pet profile page.
           req.session.user=data.dataValues;
           console.log ( req.session.user);
           req.session.save(()=>{
            req.session.loggenIn=true;
            res.redirect(`/add-pet`)
        })       
        })
        .catch(err => {
            console.log("error: ", err)
        });
});

router.get(`/add-pet`, (req, res) => {
    console.log("Hit pet-register route");
    console.log(req.session.user);
    res.render('add-pet', {
       loggedIn: req.session.loggenIn
    }
    );
});

router.post(`/add-pet`, (req, res) => {
    console.log("Hit add pet route");
    const { name, type, breed, age, gender, bio } = req.body
    // Create a temp user 
    let newPet = {
        user_id: req.session.user.id,
        name: name,
        type: type,
        breed: breed,
        age: age,
        gender: gender,
        bio: bio
    }
    console.log("new pet: ", newPet)
    
    // WE want to send that data to our User's database table
    Pet.create(newPet)
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
router.post('/logout', (req, res) => {
    if (req.session.loggenIn) {
        req.session.destroy(()=> {
            res.status(202).end();
        })
    } else {
        res.status(404).end();
    }
    })
module.exports = router;