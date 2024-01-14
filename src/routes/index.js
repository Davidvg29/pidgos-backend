const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require('../controllers/getDogs');
const getIdRaza = require('../controllers/getIdRaza');
const getDogsName = require('../controllers/getDogsName');
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');
const getDogDB = require('../controllers/getDogDB');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getDogs)
router.get("/dogs/:idRaza", getIdRaza)
router.get("/name", getDogsName)
router.get("/temperaments", getTemperaments)
router.post("/dogs", postDogs)
router.get("/dogsdatabase", getDogDB)


module.exports = router;
