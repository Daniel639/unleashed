const router = require('express').Router();
const User = require('../models/users');
const Pet = require ('../models/pets');
const Post= require ('../models/posts');
const bcrypt=require('bcrypt');
const userAuth = require('../utils/auth');
//add a page user sees after login, that will display all the pets belonging to that user and show "choose pet profile msg 
//at the top". after user clicks on a [et icon - redirect to home. 
//route to render sign-u[ form
router.get('/register', (req, res) => {
    console.log("Hit Register Route");
    res.render('register');
});
//route to sybmit sign-up form
router.post('/register/:username', async (req,res) => {
    // We want to capture the INCOMING data from our Profile VIEW
   try { 
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
    await User.create(newUser);
            // We need to determine HoW and or WHAT we RESPONSE back to the VIEW/frontend
           // res.status(301).json({ messege: "New User Created!"})
           //after user successfully registered - redirect to add pet profile page.
           req.session.user=data.dataValues;
           let id=req.session.user.id;
           //console.log ( req.session.user);
           req.session.save(()=>{
            req.session.loggenIn=true;
            res.redirect(`/add-pet/${id}`)
        })       
        } catch(err) {
            console.log("error: ", err)
        };
    });
//route to render login form
router.get('/', async (req, res) => {
    try {
        res.render('login');
         } catch (err) {
        console.log("error: ", err)
         };
    });

//route to submit login form
router.post('/login/:loginUn', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      console.log("Hit login post route");
      console.log(req.body);
      const userData = await User.findOne({ where: { username: req.body.loginUn } });
      if (!userData) {
        return res.status(404).json({ message: 'Login failed. Please try again!', success: false });
      }
      const validPassword = await userData.checkPassword(req.body.loginPw);
    // If checkPassword() evaluates as false, the user will receive an error message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }
   let id = userData.id;
   console.log(userData);
   req.session.user=userData;
      return req.session.save(()=>{
        req.session.loggenIn=true,
        res.redirect(`/choose-pet/${id}`)
        });
      
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'An error occurred during login', success: false, error: err.message });
    }
  });
  router.get('/choose-pet/:id', async (req, res) => {
    try{
    const petsData = await Pet.findAll({ where: {user_id: req.params.id}});
    console.log(petsData);
    const pets = petsData.map((pet) => pet.get({ plain: true }));
    console.log(pets);
    res.render('choose-pet', {
       pets,
       loggedIn: req.session.loggenIn})
} catch(err) {
    console.log("error: ", err)
}
});

  //route to render home page
  router.get('/home/:id/:petId', async (req, res) => {
    try{
    const petsData = await Pet.findAll({ where: {user_id: req.params.id}});
    console.log(petsData);
    const pets = petsData.map((pet) => pet.get({ plain: true }));
    console.log(pets);
    const postsData= await Post.findAll();
    console.log(postsData);
    const posts = postsData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('home', {
        pets: pets,
         posts: posts,
        loggedIn: req.session.loggenIn})
} catch(err) {
    console.log("error: ", err)
}
});
//route to display add-pet form
router.get(`/add-pet/:id`, async (req, res) => {
    try {
        console.log("Hit add-pet route");
        await res.render('add-pet', {
       loggedIn: req.session.loggenIn
        });
    } catch (err) {
        console.log("error: ", err)
    };
});
router.post(`/add-pet/:id`, async (req, res) => {
   try { console.log("Hit add pet post  route");

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
        await Pet.create(newPet)
        let id=newPet.user_id;
        // We need to determine HoW and or WHAT we RESPONSE back to the VIEW/frontend
        // res.status(301).json({ messege: "New User Created!"})
        res.redirect(`/home/${id}`)
    } catch(err) {
            console.log("error: ", err)
        };
});
//route to create a new post

router.get('/create-post/', async (req, res) => {
    try {
        res.render('login');
         } catch (err) {
        console.log("error: ", err)
         };
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


router.get('/edit', (req, res) => {
    res.render('edit', {
        loggedIn: req.session.loggenIn
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