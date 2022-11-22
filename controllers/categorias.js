const { response } = require("express");
const Categoria = require('../models/categoria')

const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;


    const [total, categorias] = await Promise.all([ // Aqui solo estamos ejecutando varios promesas a la vez para que la respuesta dure menos
        Categoria.countDocuments({ estado: true }), //total de registros en general y la condicion es que solo cuente los que tengan estado en true
        Categoria.find() //Nos tira todos los usuarios de la base de datos
            .limit(Number(limite)) //que traiga solo la cantidad de registros que yo le indique
            .skip(Number(desde)) //Por ejemplo que me traiga los registros despues de los primeros 5
            .where({ estado: true }) //Filtrar con where como en sql server
            .populate('usuario', 'nombre') //Para que haga la relacion con usuario y solo muestre el nombre
    ])

    res.json({
        total,
        categorias
    })



}

const obtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre')


    res.json( categoria );

}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase(); //Para almacenar el nombre de las categorias en mayuscula en DB

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id // GRACIAS AL MIDDLEWARE VALIDAR JWT, SIEMPRE VAMOS A TENER EL USUARIO Y SU ID EN LA REQ
    }

    const categoria = new Categoria(data); // Hacemos la instancia del modelo con su data

    // Y luego guardamos en DB
    await categoria.save();

    res.status(201).json(categoria)


}

const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } ) //El new es para que en la respuesta se muestre la informacion nueva



    res.json( categoria );

}

const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(categoriaBorrada)

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}