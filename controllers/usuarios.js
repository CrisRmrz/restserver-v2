const { response } = require("express")

//* Nota de lo que puedo extraer del req:
//* req.params esto para extraer los parametros del url obligatorios como con una ruta usuarios/:id
//* req.body para sacar lo que enviamos por el body en postman
//* Luego tenemos el req.query que es para extraer los parametros opcionales del url como por ejemplo http://localhost:8080/api/usuarios?id=100&nombre=cris

const usuariosGet = (req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API',
        query
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}