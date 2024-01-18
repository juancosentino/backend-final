const express = require('express')
const { check } = require('express-validator')
const {createUser, updateUser, getUser, getOneUser, deleteUser, loginUser} = require('../controllers/users.controllers')
const auth = require('../middlewars/auth')
const route = express.Router()

/* VALIDACIONES CON BACKEND - EXPRESS VALIDATOR*/
route.post('/',[
    check('nombreUsuario', 'Campo nombreUsuario esta vacio').notEmpty(),
    check('emailUsuario', 'Campo emailUsuario esta vacio').notEmpty(),
    check('emailUsuario', 'Formato incorrecto. EJ: mail@dominio.com').isEmail(),
    check('emailUsuario', 'Min: 10 Max: 50').isLength({min: 10, max: 50}),
    check('contrasenia', 'Campo emailUsuario esta vacio').notEmpty(),
    check('contrasenia', 'Min: 8 caracteres').isLength({ min:8 })
], createUser)
route.post('/login', loginUser)
route.get('/', auth ,getUser)
route.get('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId()
],getOneUser)
route.put('/:id', updateUser)
route.delete('/:id', deleteUser)



module.exports = route