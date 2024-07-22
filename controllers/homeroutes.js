const router = require('express').Router();
const User = require('../models/users');
const Pet = require ('../models/pets');
const Post= require ('../models/posts');
const Comment= require ('../models/comments');
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
  const dbUser = await User.create(newUser);
  console.log("DB user:", dbUser);
            // We need to determine HoW and or WHAT we RESPONSE back to the VIEW/frontend
           // res.status(301).json({ messege: "New User Created!"})
           //after user successfully registered - redirect to add pet profile page.
           req.session.user=dbUser.dataValues;
           let id=req.session.user.id;
           //console.log ( req.session.user);
           req.session.save(()=>{
            req.session.loggedIn=true;
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
        req.session.loggedIn=true,
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
       loggedIn: req.session.loggedIn})
} catch(err) {
    console.log("error: ", err)
}
});

  //route to render home page
  router.get('/home/:id/:petId', async (req, res) => {
    try {
        const petId=req.params.petId;
       const  petData=await Pet.findByPk(petId);
       console.log(petData);
       const petString = JSON.stringify(petData);
       const pet = JSON.parse(petString);
       console.log("Pet data for template: ", pet);
       const postsData= await Post.findAll({where: {pet_id: petId }});
       const posts = postsData.map((post) => post.get({ plain: true }));
       console.log("Posts data for template: ", posts);
        // Render the page with pet details and posts
        res.render('home', { posts, 
            pet,
            loggedIn: req.session.loggedIn
         }); // Adjust 'petDetails' to your Handlebars template
      } catch (error) {
        console.error('Error fetching pet and posts:', error);
        res.status(500).send('Internal Server Error');
      }
    });
//route to display add-pet form
router.get(`/add-pet/:id`, async (req, res) => {
    try {
        console.log("Hit add-pet route");
        await res.render('add-pet', {
       loggedIn: req.session.loggenIn,
        });
    } catch (err) {
        console.log("error: ", err)
    };
});
router.post(`/add-pet/:id`, async (req, res) => {
   try { console.log("Hit add pet post  route");

        const { name, type, breed, age, gender, bio } = req.body
        console.log(req.session.user)
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
        let userId=newPet.user_id;
        // We need to determine HoW and or WHAT we RESPONSE back to the VIEW/frontend
        // res.status(301).json({ messege: "New User Created!"})
        res.redirect(`/choose-pet/${userId}`)
    } catch(err) {
            console.log("error: ", err)
        };
});
//route to create a new post

router.get('/create-post/:id', async (req, res) => {
    try {
        await res.render('create-post');
         } catch (err) {
        console.log("error: ", err)
         };
    });
    router.get('/edit-pet/:id', async (req, res) => {
        try {
                console.log("Hit edit-pet route");
                const id=req.params.id;
                console.log(id);
                const petData=await Pet.findByPk(id);
                console.log("Pet data: ", petData);
                const petString = JSON.stringify(petData);
                const pet = JSON.parse(petString);
                console.log("Pet data: ", pet);
               
                await res.render('edit-pet', { 
                pet,
               loggedIn: req.session.loggedIn,
                });
            } catch (err) {
                console.log("error: ", err)
            };
        });
        router.put('/edit-pet/:id', async (req, res) => {
            try {
                console.log("Hit edit-pet put route");
                let id = req.params.id;
                 await Pet.update(
                {
                    name: req.body.name,
                    type: req.body.type,
                    breed:req.body. breed,
                    age: req.body.age,
                    gender: req.body.gender,
                    bio: req.body.bio
                },
                { where: {id: id }});
                const petData=await Pet.findByPk(id);
                console.log("Updated pet: ", petData);
                const petString = JSON.stringify(petData);
                const pet = JSON.parse(petString);
                const postsData= await Post.findAll({where: {pet_id:id }});
                const posts = postsData.map((post) => post.get({ plain: true }));
                let userId=pet.user_id;
                res.render('home', { posts, 
                    pet,
                    loggedIn: req.session.loggedIn
                 });
            } catch (err) {
                    console.log("error: ", err)
                };
            });
router.get('/feed/:id', async (req, res) => {
        try { 
            const allPostsData = await Post.findAll();
            const posts = allPostsData.map((post) => post.get({ plain: true }));
            res.render('feed', {
            posts,
            loggedIn: req.session.loggedIn
            });
        } catch(err) {
        console.log("error: ", err)
                }
});

router.get('/schedule-playdate', async (req, res) => {
    try { 
        await res.render('playdate-form', {
        loggedIn: req.session.loggedIn
        });
    } catch(err) {
        console.log("error: ", err)
    }
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

router.post('/logout', async (req, res) => {
   try{ if (req.session.loggenIn) {
            req.session.destroy(()=> {
            res.status(202).end();
            })
        } else {
            res.status(404).end();
        };
    } catch(err) {
        console.log("error: ", err)
    }
});

module.exports = router;

router.get('/view-playdates/:id', async (req, res) => {
    try { 
        await res.render('scheduled-playdates', {
        loggedIn: req.session.loggenIn
        });
    } catch(err) {
        console.log("error: ", err)
    }
});