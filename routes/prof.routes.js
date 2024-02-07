const express = require('express');
const route = express.Router();
const { check, validationResult, param } = require('express-validator');
const { crearDoctor, obtenerDoctores, actualizarDoctor, eliminarDoctor, obtenerUnDoctor } = require('../controllers/prof.controllers');

route.post('/', [
    check('nombre', 'Campo nombre es requerido').notEmpty(),
    check('apellido', 'Campo apellido es requerido').notEmpty(),
    check('correo', 'Campo correo es requerido').notEmpty().isEmail(),
    check('especialidad', 'Campo especialidad es requerido').notEmpty(),
], crearDoctor);
route.get('/', obtenerDoctores);
route.put('/:id', [
    check('id', 'Formato incorrecto de ID').isMongoId(),
    check('nombre', 'Campo nombre es requerido').optional().notEmpty(),
    check('apellido', 'Campo apellido es requerido').optional().notEmpty(),
    check('correo', 'Campo correo es requerido').optional().notEmpty().isEmail(),
    check('especialidad', 'Campo especialidad es requerido').optional().notEmpty(),
], actualizarDoctor);
route.delete('/:id', [
    check('id', 'Formato incorrecto de ID').isMongoId(),
], eliminarDoctor);
route.get('/:id', [
    param('id', 'Formato incorrecto de ID').isMongoId(),
], obtenerUnDoctor);

module.exports = route;
