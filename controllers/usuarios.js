const {response, request} = require('express');
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

    const body = req.body
    const usuario = new Usuario(body)

    await usuario.save()

    res.json({
        ok: true,
        body
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