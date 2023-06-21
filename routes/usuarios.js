const {Router} = require('express');
const {check} = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post(
    '/',
    check('email', 'el email no es válido').isEmail(), 
    usuariosPost
)

router.delete('/', usuariosDelete)

module.exports = router