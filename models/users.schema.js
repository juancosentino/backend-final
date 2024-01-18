const { Schema, model } = require('mongoose')

const UsersSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    emailUsuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    }
})

const UsersModel = model('users', UsersSchema)
module.exports = UsersModel