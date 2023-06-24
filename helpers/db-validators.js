const Role = require('../models/role');
const Usuario = require('../models/usuario');

//validar role
const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({role})
    
    if(!existeRol){
        throw new Error(`El role ${role} no es válido`)
    }
}

//validar que el correo no exista
const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({email})
    
    if(existeEmail){
        throw new Error(`El email: ${email}, ya se encuentra registrado en la BD.`)
    }
}

const existeUsuarioPorId = async (id) => {
    const usuario = await Usuario.findById(id)
    if(!usuario){
        throw new Error(`El usuario con id: ${id} no existe en la Base de Datos`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}