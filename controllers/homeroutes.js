const router = require('express').Router();
const User = require('../models/users');
const Pet = require('../models/pets');
const bcrypt = require('bcrypt');
const {userAuth} = require('../utils/auth'); // Destructure userAuth from the imported module


// Route to render login form
router.get('/', (_req, res) => {
    res.render('login');
});

// Additional route to render login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Route to render sign-up form
router.get('/register', (_req, res) => {
    res.render('register');
});

// ... (login and register routes)

// Route to display add-pet form
router.get('/add-pet/:id', userAuth, async (req, res) => { 
    try {
        if (req.session.loggedIn) { // Check if the user is logged in
            res.render('add-pet', { loggedIn: req.session.loggedIn });
        } else {
            res.redirect('/login'); // Redirect to login if not logged in
        }
    } catch (err) {
        console.error('Error in add-pet route:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to submit add-pet form
router.post('/add-pet/:id', userAuth, async (req, res) => {
    try {
        // ... (rest of your route logic)
    } catch (err) {
        // ... (error handling)
    }
});

// Route to choose pet
router.get('/choose-pet/:id', userAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) { // Check if the user is logged in
            const pets = await Pet.findAll({ where: { user_id: req.params.id } });
            res.render('choose-pet', { pets, loggedIn: req.session.loggedIn });
        } else {
            res.redirect('/login'); // Redirect to login if not logged in
        }
    } catch (err) {
        console.error("Error in /choose-pet route:", err);
        res.status(500).json({ message: "Error fetching pets.", success: false, error: err.message });
    }
});

module.exports = router;
