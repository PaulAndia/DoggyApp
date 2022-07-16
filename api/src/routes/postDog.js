const { Router } = require('express'); 
const { Dog, Temperaments } = require("../db");
const router = Router();


router.post("/", async (req, res) => {
    try {
        const {name, height, weight, years, image, temperaments} = req.body;
        const newDog = await Dog.create({
            name,
            height,
            weight,
            years,
            image,
        })
        temperaments.forEach(e => {Temperaments.findOrCreate({where: {name: e.toLowerCase()}})});
        let tempsAddedToNewDog = await Temperaments.findAll({where: {name: temperaments}}) // --> []
        newDog.addTemperaments(tempsAddedToNewDog);
        return res.status(201).send("Dog created succesfully")
    } catch (error) {
        res.status(404).send('Error while creating Dog');
    }
})

module.exports = router;