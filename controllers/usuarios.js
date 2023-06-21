const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    const {q, name, edad = "Not provided"} = req.query

    res.json({
        msg: 'getAPI - controller',
        q,
        name,
        edad
    });
}

const usuariosPost = async (req = request, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    const { nombre, email, password, role } = req.body
    const usuario = new Usuario({nombre, email, password, role})

    //validar que el correo no exista
    const existeEmail = await Usuario.findOne({email})
    if(existeEmail){
        return res.status(400).json({
            msg: `El email: ${email}, ya se encuentra registrado en la BD.`
        })
    }

    //encriptar password
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en BD
    await usuario.save()

    res.json({
        ok: true,
        usuario
    });
}

const usuariosPut = (req = request, res) => {
    const id = req.params.id
    console.log(id);
    
    res.json({
        msg: 'putAPI - controller',
        id
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'deleteAPI - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}