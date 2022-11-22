
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    usuario: { //ESTO ES PARA SABER EL USUARIO QUE CREó LA CATEGORIA
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //COMO LO PONGO AQUI TIENE QUE ESTAR EN EL OTRO MODELO DE USUARIO(EN LA PARTE DONDE EXPORTAMOS Y LE PONEMOS EL NOMBRE)
        required: [true, 'Es obligatorio establecer el usuario que creó la categoria']
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true }
})

ProductoSchema.methods.toJSON = function() { //Esta funcion sirve para excluir el __v y el password para que no se muestre en el res en el postman, pero si se guarda todo en el mongo db

    const { __v, estado, ...producto } = this.toObject();
    return producto;

}

module.exports = model('Producto', ProductoSchema);