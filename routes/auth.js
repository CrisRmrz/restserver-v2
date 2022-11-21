
const { check } = require('express-validator');
const { Router } = require('express'); //Me permite crearme las instancias de router
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login',[
    check('correo',' El correo es obligatorio').isEmail(),
    check('password',' La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


module.exports = router;