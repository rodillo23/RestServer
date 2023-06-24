const {validationResult} = require('express-validator')

const validarCampos = (req, res, next) => {
    
    const errores = validationResult(req)
    
    if(!errores.isEmpty()){
        const errorResult = errores.errors.map(error => {
            return error.msg
        })

        return res.status(400).json({errorResult})
    }
    next()
}

module.exports = {
    validarCampos
}