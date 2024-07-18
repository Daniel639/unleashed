const router = require('express').Router();
const User = require('../models/user');
const Pet = require('../models/pet');
const bcrypt=require('bcrypt');

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/home', (req, res) => {
    console.log("Hit Home Route");
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
  });

router.get('/profile/:name?', async (req, res) => {
    console.log("Request Params Object: ", req.params);
    console.log("Hit Profile Route");
    
    try {
        let user = null;
        if (req.params.name) {
            user = await User.findOne({ where: { username: req.params.name } });
        } else if (req.session.user_id) {
            user = await User.findByPk(req.session.user_id);
        }

        if (user) {
            user = user.get({ plain: true });
        }

        res.render('profile', { user });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).render('error', { message: 'An error occurred while fetching the profile.' });
    }
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
      return res.redirect('home');
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'An error occurred during login', success: false, error: err.message });
    }
  });

router.post('/submit-register-form', (req, res) => {
    console.log("Incoming Data: ", req.body);
    const { firstName, lastName, username, password } = req.body;
    
    let newUser = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password
    };
    console.log("New User: ", newUser);
    
    User.create(newUser)
        .then(data => {
            console.log("data: ", data.dataValues);
            res.redirect('/home');
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).render('error', { message: 'An error occurred while creating the user.' });
        });
});

router.get('/edit/:id?', (req, res) => {
    console.log("Hit Edit Pet Route");
    const petId = req.params.id;
    console.log("Pet ID:", petId);
    console.log("Query params:", req.query);
    console.log("Full URL:", req.originalUrl);

    if (!petId) {
        res.render('edit', { pet: null });
        return;
    }

    Pet.findByPk(petId)
        .then(petData => {
            if (!petData) {
                console.log("No pet found with this id");
                res.status(404).render('error', { message: 'No pet found with this id!' });
                return;
            }
            const pet = petData.get({ plain: true });
            console.log("Pet data:", pet);
            res.render('edit', { pet });
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).render('error', { message: 'An error occurred while fetching the pet.' });
        });
});

router.post('/create-pet', (req, res) => {
    console.log("Hit Create Pet Route");
    console.log("New Pet Data:", req.body);

    Pet.create(req.body)
        .then(newPet => {
            res.redirect(`/edit/${newPet.id}`);
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).render('error', { message: 'An error occurred while creating the pet.' });
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
                res.status(404).render('error', { message: 'No pet found with this id!' });
                return;
            }
            res.redirect('/profile');
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).render('error', { message: 'An error occurred while updating the pet.' });
        });
});

module.exports = router;