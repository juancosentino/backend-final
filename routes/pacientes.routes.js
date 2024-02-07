const express = require('express')
const { check, param } = require('express-validator')
const {createPaciente, updatePaciente, getAllPacientes, getOnePaciente, deletePaciente } = require('../controllers/pacientes.controllers')
const route = express.Router()

/* VALIDACIONES CON BACKEND - EXPRESS VALIDATOR*/
route.post('/', [
    check('dueño').notEmpty().withMessage('Campo dueño es requerido'),
    check('email').notEmpty().isEmail().withMessage('Campo email es requerido y debe ser un correo válido'),
    check('telefono').notEmpty().withMessage('Campo telefono es requerido'),
    check('mascota').notEmpty().withMessage('Campo mascota es requerido'),
    check('especie').notEmpty().withMessage('Campo especie es requerido'),
    check('raza').notEmpty().withMessage('Campo raza es requerido'),
], createPaciente);
route.get('/',getAllPacientes)
route.get('/:id', [
    param('id').isMongoId().withMessage('Formato incorrecto de ID'),
], getOnePaciente);
route.put('/:id', [
    param('id').isMongoId().withMessage('Formato incorrecto de ID'),
    check('dueño').optional().notEmpty().withMessage('Campo dueño es requerido'),
    check('email').optional().notEmpty().isEmail().withMessage('Campo email es requerido y debe ser un correo válido'),
    check('telefono').optional().notEmpty().withMessage('Campo telefono es requerido'),
    check('mascota').optional().notEmpty().withMessage('Campo mascota es requerido'),
    check('especie').optional().notEmpty().withMessage('Campo especie es requerido'),
    check('raza').optional().notEmpty().withMessage('Campo raza es requerido'),
], updatePaciente);
route.delete('/:id', [
    param('id').isMongoId().withMessage('Formato incorrecto de ID'),
], deletePaciente);
  

module.exports = route