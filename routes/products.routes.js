const express = require('express')
const route = express.Router()
const {createProduct, getProduct, getOneProduct, updateProduct, deleteProduct} = require('../controllers/product.controllers')

route.post('/', createProduct)

route.get('/', getProduct)

route.get('/:id', getOneProduct)

route.put('/:id', updateProduct)

route.delete('/:id', deleteProduct)

module.exports = route
