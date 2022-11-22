const { check } = require('express-validator');
const { Router } = require('express'); //Me permite crearme las instancias de router
const { buscar } = require('../controllers/buscar');

const router = Router();

router.get('/:coleccion/:termino', buscar) //Por ejemplo /categoria/Lacteos




module.exports = router;