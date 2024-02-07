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

UsersSchema.methods.toJSON = function() {
    const { __v, contrasenia, ...usuario } = this.toObject()
    return usuario
}

const UsersModel = model('users', UsersSchema)
module.exports = UsersModel