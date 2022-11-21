const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne( {correo} );
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario - password incorrectos - correo'
            })
        }

        // Verificar si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario - password incorrectos - estado: false'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password ); // Regresa un booleano, comparo las contraseñas por eso ocupo el bcrypt porque viene encriptada
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario - password incorrectos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}