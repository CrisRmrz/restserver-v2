
const { Router } = require('express'); //Me permite crearme las instancias de router
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-JWT');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', usuariosGet);

router.post('/', [   //En los corchetes tenemos los middlewares, esto es gracias al paquete express validator
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener una longitud minima de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id','El id no es un id valido en mongo').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    //esAdminRole, //Este middleware fuerza que tenga que ser administrador
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','El id no es un id valido en mongo').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);



module.exports = router;