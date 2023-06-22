const {Router} = require('express');
const {check} = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Email no válido').isEmail(), 
        check('email').custom( emailExiste ),
        check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}), 
        check('role').custom( esRoleValido ),
        validarCampos
    ],

    usuariosPost
)

router.delete('/', usuariosDelete)

module.exports = router