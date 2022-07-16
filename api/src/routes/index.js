const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require("./getDogs");
const postDog = require("./postDog");
const temp = require("./getTemps");

const router = Router();

// Configurar los routers
router.use('/dogs', dogs);
router.use('/dog', postDog);
router.use('/temperaments', temp);


module.exports = router;
