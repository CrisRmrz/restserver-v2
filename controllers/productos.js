

const { response } = require("express");
const Producto = require('../models/producto')

const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;


    const [total, productos] = await Promise.all([ // Aqui solo estamos ejecutando varios promesas a la vez para que la respuesta dure menos
        Producto.countDocuments({ estado: true }), //total de registros en general y la condicion es que solo cuente los que tengan estado en true
        Producto.find() //Nos tira todos los usuarios de la base de datos
            .limit(Number(limite)) //que traiga solo la cantidad de registros que yo le indique
            .skip(Number(desde)) //Por ejemplo que me traiga los registros despues de los primeros 5
            .where({ estado: true }) //Filtrar con where como en sql server
            .populate('usuario', 'nombre') //Para que haga la relacion con usuario y solo muestre el nombre
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    })



}

const obtenerProducto = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById( id ).populate('usuario', 'nombre').populate('categoria', 'nombre')


    res.json( categoria );

}

const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id // GRACIAS AL MIDDLEWARE VALIDAR JWT, SIEMPRE VAMOS A TENER EL USUARIO Y SU ID EN LA REQ
    }

    const producto = new Producto(data); // Hacemos la instancia del modelo con su data

    // Y luego guardamos en DB
    await producto.save();

    res.status(201).json(producto)


}

const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } ) //El new es para que en la respuesta se muestre la informacion nueva



    res.json( producto );

}

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(productoBorrado)

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}