const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const {desde = 0, limite = 5} = req.query
    const query = {estado:true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)) 
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req = request, res) => {

    //obtenemos los datos del body 
    const { nombre, email, password, role } = req.body
    const usuario = new Usuario({nombre, email, password, role})

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

const usuariosPut = async(req = request, res) => {

    const id = req.params.id
    const {_id, password, google, email, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync() 
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true})
    
    res.json(usuario);
}

const usuariosDelete = async(req, res) => {
    const {id} = req.params


    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true})

    res.json({
        usuario,
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}