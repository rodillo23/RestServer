const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        
        const payload = {uid}

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('Hubo un error al generar el Token')
            } else{
                resolve(token)
            }
        })
    })
} 

module.exports = {
    generarJWT
}