const { Router } = require('express'); 
const { getDogsAPI, getDogsDB, getTotalDogs, getDogsById} = require('../utils/utils');
const router = Router();

router.get("/", async (req, res) => {
    const {name} = req.query;
    const fullDogs = await getTotalDogs();
    try {
        if(name){
            let dogMatches = fullDogs.filter(e => e.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
            if(dogMatches.length > 0) res.status(201).json(dogMatches);
            else res.status(404).send("The pokemon name does not exist")
        }else{
            res.status(201).json(fullDogs);
        }
    } catch (error) {
        res.status(404).send("Error while requesting dogs")
    }
})


router.get("/api", async (req, res) => {
    const allAPI =await getDogsAPI()
    try {
        res.status(201).json(allAPI);
    } catch (error) {
        res.status(404).send("Error while requesting dogs")
    }
})

// router.get("/db", async (req, res) => {
//     const allDB =await getDogsDB()
//     try {
//         res.status(201).json(allDB);
//     } catch (error) {
//         res.status(404).send("Error while requesting dogs")
//     }
// })

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const totalDogs = await getTotalDogs();
    try {
        if(id){
            if(!isNaN(id)){
                let dogDetails = await getDogsById(id);
                if(typeof dogDetails === 'undefined') res.status(404).send(`Dog with Id: ${id} NOT found`);
                res.status(201).json(dogDetails);
            }else{
                let dogDetails = totalDogs.filter(e => e.id === id);
                if(dogDetails.length > 0) res.status(201).json(dogDetails[0])
                else res.status(201).send("Dog Id not found")
            }
        }
    } catch (error) {
        res.status(404).send(`Dog with ID ${id} does not exist`)
    }
})


router.get("/", async (req, res) => {
    const full =await getTotalDogs()
    try {
        res.status(201).json(full);
    } catch (error) {
        res.status(404).send("Error while requesting dogs")
    }
})


module.exports = router;