const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
    if(!req.usuarioAuth){
        return res.status(500).json({
            msg: 'Se quiere validar role sin validar el token primero'
        })
    }

    const {role, nombre} = req.usuarioAuth

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre}, no tiene permisos de Administrador`
        })
    }

    next()
}

const tieneRole = ( ...roles ) => {
    return (req, res, next) => {
        if(!req.usuarioAuth){
            return res.status(500).json({
                msg: 'Se quiere validar role sin validar el token primero'
            })
        }

        if(!roles.includes( req.usuarioAuth.role )){
            return res.status(401).json({
                msg: 'No tiene ningun role permitido para esta acción.'
            })
        }

        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}