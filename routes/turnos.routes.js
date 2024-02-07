const express = require('express')
const { check } = require('express-validator')
const {createTurno, updateTurno, deleteTurnos, getAllTurnos, getOneTurno, deleteTurno } = require('../controllers/turnos.controllers')
const route = express.Router()

/* VALIDACIONES CON BACKEND - EXPRESS VALIDATOR*/
route.post('/', [
    check('dueño', 'Campo dueño es requerido').notEmpty(),
    check('detalle', 'Campo detalle es requerido').notEmpty(),
    check('veterinario', 'Campo veterinario es requerido').notEmpty(),
    check('mascota', 'Campo mascota es requerido').notEmpty(),
    check('fecha', 'Campo fecha es requerido').notEmpty(),
    check('hora', 'Campo hora es requerido').notEmpty(),
],createTurno);
route.get('/', getAllTurnos);
route.get('/:id', [
  check('id', 'Formato incorrecto de ID').isMongoId()
],getOneTurno);
route.put('/:id', [
    check('id', 'Formato incorrecto de ID').isMongoId()
], updateTurno);
route.delete('/:id', [
    check('id', 'Formato incorrecto de ID').isMongoId()
], deleteTurno);
route.delete('/',deleteTurnos)

module.exports = route