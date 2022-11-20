
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] //El segundo argumento es un mensaje en caso de error
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //Mongo se va a encargar de revisar que no hayan correos repetidos, sino, tira error
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE','USER_ROLE'] //Que la base de datos solo permita esos 2 valores a la hora de hacer un guardado en DB
    },
    estado: { //No voy a hacer eliminaciones fisicas, las eliminaciones las voy a  hacer con este campo. Si quiero borrar un usuario entonces pongo el estado en false
        type: Boolean,
        default: true
    },
    google: { //Me dice si el usuario fue creado mediante el google sign in que voy a implementar
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() { //Esta funcion sirve para excluir el __v y el password para que no se muestre en el res en el postman, pero si se guarda todo en el mongo db

    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

module.exports = model( 'Usuario', UsuarioSchema ); //El primer agumento es para ponerle el nombre a la coleccion en la base de datos, si le pongo Usuario entonces en DB va a aparecer como Usuarios con s