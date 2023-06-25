const {request, response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req = request, res = response) => {
    
    const {email, password} = req.body
    
    try {

        //verificar que el email existe
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario o contraseña no válidos -> email'
            })
        }

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o contraseña no válidos -> estado'
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o contraseña no válidos -> password'
            })
        }
        
        //Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario, 
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error de servidor"
        })
    }


}

module.exports = {
    login
}