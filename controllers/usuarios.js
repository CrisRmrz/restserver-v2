const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

//* Nota de lo que puedo extraer del req:
//* req.params esto para extraer los parametros del url obligatorios como con una ruta usuarios/:id
//* req.body para sacar lo que enviamos por el body en postman
//* Luego tenemos el req.query que es para extraer los parametros opcionales del url como por ejemplo http://localhost:8080/api/usuarios?id=100&nombre=cris

const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;


    const [ total, usuarios ] = await Promise.all([ // Aqui solo estamos ejecutando varios promesas a la vez para que la respuesta dure menos
        Usuario.countDocuments({ estado: true }), //total de registros en general y la condicion es que solo cuente los que tengan estado en true
        Usuario.find() //Nos tira todos los usuarios de la base de datos
        .limit( Number(limite) ) //que traiga solo la cantidad de registros que yo le indique
        .skip( Number( desde ) ) //Por ejemplo que me traiga los registros despues de los primeros 5
        .where({ estado: true }) //Filtrar con where como en sql server
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10); //El parametro del genSaltSync el que tan seguro va a ser la contraseña, un 10 es bastante bueno y esta por defecto
    usuario.password = bcryptjs.hashSync(password, salt); //Encriptamos la contraseña y la metemos al modelo para despues guardarla en DB, el primer parametro es el password que recibimos en el body por postman

    //Guardar en DB
    await usuario.save();

    res.json({
        msg: 'post API',
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10); //El parametro del genSaltSync el que tan seguro va a ser la contraseña, un 10 es bastante bueno y esta por defecto
        resto.password = bcryptjs.hashSync(password, salt); //Encriptamos la contraseña y la metemos al modelo para despues guardarla en DB, el primer parametro es el password que recibimos en el body por postman
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto ); //Primer argumento para el id de base de dactos que vamos a actualizar y segundo argumento la info a actualizar

    res.json(usuario)
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    
    const usuarioAutenticado = await req.usuario;

    // borrar fisicamente de la base de datos
    //const usuario = await Usuario.findByIdAndDelete( id );//Pero de esta manera no lo vamos a manejar aqui, aqui lo manejamos por estados
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }); // Ponemos el estado en false para borrarlo

    res.json({
        usuario,
        usuarioAutenticado
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}