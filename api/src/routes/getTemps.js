const { Router } = require('express'); 
const router = Router();
const {Temperaments} = require('../db');

router.get("/", async (req, res) => {
    try {
        const tempsDB = await Temperaments.findAll();
        res.status(201).json(tempsDB);
    } catch (error) {
        res.status(404).send("Error while requesting temperaments")
    }
})

module.exports = router;