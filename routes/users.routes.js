const express = require('express')
const { check } = require('express-validator')
const { validationResult } = require('express-validator');
const {createUser, updateUser, getUser, getOneUser, deleteUser, loginUser} = require('../controllers/users.controllers')
const auth = require('../middlewars/auth')
const route = express.Router()


/* VALIDACIONES CON BACKEND - EXPRESS VALIDATOR*/
route.post(
    '/',
    [
        check('nombreUsuario', 'Campo nombre del usuario está vacío').notEmpty(),
        check('emailUsuario', 'Campo email usuario está vacío').notEmpty(),
        check('emailUsuario', 'Formato incorrecto. EJ: mail@dominio.com').isEmail(),
        check('emailUsuario', 'Min: 10 Max: 50').isLength({ min: 10, max: 50 }),
        check('contrasenia', 'Campo contraseña está vacío').notEmpty(),
        check('contrasenia', 'Min: 8 caracteres').isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Si hay errores, muestra un mensaje de error utilizando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: 'Por favor, corrija los errores en el formulario.',
            });
            return res.status(400).json({ errors: errors.array() });
        }
        createUser(req, res);
    }
);
/* route.post('/',[
    check('nombreUsuario', 'Campo nombre del usuario esta vacio').notEmpty(),
    check('emailUsuario', 'Campo email usuario esta vacio').notEmpty(),
    check('emailUsuario', 'Formato incorrecto. EJ: mail@dominio.com').isEmail(),
    check('emailUsuario', 'Min: 10 Max: 50').isLength({min: 10, max: 50}),
    check('contrasenia', 'Campo contraseña esta vacio').notEmpty(),
    check('contrasenia', 'Min: 8 caracteres').isLength({ min:8 })
], createUser) */
route.post('/login',[
    check('emailUsuario', 'Campo email vacio'),
    check('contrasenia', 'Campo contraseña esta vacio').notEmpty(),
    check('contrasenia', 'Min: 8 caracteres').isLength({ min:8 })
] ,loginUser)
route.get('/', auth ,getUser)
route.get('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId()
],getOneUser)
route.put('/:id', [
    check('id', 'Formato incorrecto de ID').isMongoId()
] ,updateUser)
route.delete('/:id', [
    check('id', 'Formato incorrecto de ID').isMongoId()
] ,deleteUser)



module.exports = route