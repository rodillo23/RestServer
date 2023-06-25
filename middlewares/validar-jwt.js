const { response, request } = require("express")
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg: 'No se recibio token de acceso'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        //obtener el usuario por uid
        const usuario = await Usuario.findById(uid)

        //verificar que el usuario exista en la BD
        if(!usuario){
            return res.status(401).json({
                msg: 'El usuario no existe en la BD'
            })
        }
        
        //verificar si el uid no esta marcado como false
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'El usuario ha sido eliminado y no tiene permiso para realizar esta operación'
            })
        }

        req.usuarioAuth = usuario
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}


module.exports = validarJWT