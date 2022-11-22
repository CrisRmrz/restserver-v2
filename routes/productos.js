const { check } = require('express-validator');
const { Router } = require('express'); //Me permite crearme las instancias de router
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const { crearProducto, obtenerProductos, actualizarProducto, borrarProducto, obtenerProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener una categoria en particular por id - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

// Crear categoria - privado cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto);

// Actualizar categoria - privado cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un ID de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);

// Borrar una categoria - privado SOLO ADMIN_ROLE
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);

module.exports = router;