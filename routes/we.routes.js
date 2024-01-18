const express = require('express')
const route = express.Router()
const { createCreator, getCreators, updateCreator, deleteCreator} = require('../controllers/we.controllers')

route.post('/', createCreator)

route.get('/', getCreators)

route.put('/:id', updateCreator)

route.delete('/:id', deleteCreator)

module.exports = route