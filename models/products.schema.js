const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true 
    },
    descripcion: {
        type: String,
        required: true 
    },
    destacado: {
        type: String,
        default: false,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
})

const ProductsModel = mongoose.model('product', ProductsSchema)
module.exports = ProductsModel