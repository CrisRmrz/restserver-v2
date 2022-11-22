const Categoria = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '') => {  //Validar que solo pueda agregar usuarios con rol que exista en base de datos
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo }); //Me regresa todo el objeto si lo encuentra y si no lo encuentra un null
    if (existeEmail) {
        throw new Error('Ya existe un usuario con ese email');
    }

}

const existeUsuarioPorId = async(id = '') => {

    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById( id ); //Me regresa todo el objeto si lo encuentra y si no lo encuentra un null
    if (!existeUsuario) {
        throw new Error('No existe un usuario con ese id');
    }

}

const existeCategoriaPorId = async(id = '') => {

    // Verificar si la categoria existe
    const existeCategoria = await Categoria.findById( id ); //Me regresa todo el objeto si lo encuentra y si no lo encuentra un null
    if (!existeCategoria) {
        throw new Error('No existe una categoria con ese id');
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}