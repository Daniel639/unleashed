const router = require('express').Router();
const Pet = require('../models');
const PlayDate = require('../models/playdates');

router.get('/schedule-play-date', async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.render('schedule-play-date', { pets });
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/schedule-play-date', async (req, res) => {
    const { pet1Id, pet2Id, date, location } = req.body;

    try {
        const newPlayDate = await PlayDate.create({
            pet1Id,
            pet2Id,
            date: new Date(date),
            location
        });

        res.redirect('/home');
    } catch (err) {
        console.error('Error scheduling play date:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;