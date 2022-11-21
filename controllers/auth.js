const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
const { DefaultTransporter } = require('google-auth-library');

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

const googleSignIn = async( req, res= response ) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            //Si no existe tengo que crearlo
            console.log('entro')
            const data = {
                nombre,
                correo,
                password: '123',
                img,
                google: true,
                rol: 'USER_ROLE'
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}


module.exports = {
    login,
    googleSignIn
}