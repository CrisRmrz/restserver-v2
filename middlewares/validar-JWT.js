const { response, request, json } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token'); //Leer de los headers en postman, porque ahí es donde vamos a enviar el token para validarlo

    // Verificar que me esten mandando el x-token por los headers
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY ) //Hay que enviar el token que mandamos por postman y la variable de entorno

        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        // Verificar si el uid tiene estado en true
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado en false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}