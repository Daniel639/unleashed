const router = require('express').Router();
const { Pet, Playdate, PetPlaydate, User } = require('../../models');
const { userAuth } = require('../../utils/auth');
// Route to render the schedule play date form
router.get('/schedule', userAuth, async (req, res) => {
    try {
        const pets = await Pet.findAll({
            where: { user_id: req.session.user_id }
        });
        res.render('playdate-form', { pets });
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to handle play date scheduling form submission
router.post('/schedule', userAuth, async (req, res) => {
    const { pet1Id, pet2Id, date, location } = req.body;

    if (!pet1Id || !pet2Id || !date || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPlaydate = await Playdate.create({
            date: new Date(date),
            location
        });

        await PetPlaydate.bulkCreate([
            { pet_id: pet1Id, playdate_id: newPlaydate.id },
            { pet_id: pet2Id, playdate_id: newPlaydate.id }
        ]);

        res.status(201).json({ message: 'Play date scheduled successfully', playdate: newPlaydate });
    } catch (err) {
        console.error('Error scheduling play date:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all playdates for the logged-in user
router.get('/', userAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Pet,
                    include: [
                        {
                            model: Playdate,
                            as: 'petPlaydates',
                            through: PetPlaydate,
                            include: [
                                {
                                    model: Pet,
                                    as: 'playdatePets',
                                    through: PetPlaydate
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const playdates = user.Pets.flatMap(pet => pet.petPlaydates);
        res.json(playdates);
    } catch (err) {
        console.error('Error fetching play dates:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;