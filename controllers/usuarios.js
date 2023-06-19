const {response, request} = require('express')

const usuariosGet = (req = request, res = response) => {

    const {q, name, edad = "Not provided"} = req.query

    res.json({
        msg: 'getAPI - controller',
        q,
        name,
        edad
    });
}

const usuariosPost = (req = request, res) => {

    const {nombre, edad, puesto} = req.body

    res.json({
        msg: 'postAPI - controller',
        nombre, 
        edad, 
        puesto
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