
const { validationResult } = require("express-validator");

const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req); //Aqui estamos atrapando los errores de los middlewares en los routes
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next();

}

module.exports = {
    validarCampos
}