const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const CreatorsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    }
})

/* UsersSchema.methods.toJSON = funtion(){
    const { __v, contrasenia, ...usuario } = this.toObject()
    return usuario
} */

const CreatorsModel = mongoose.model('creators', CreatorsSchema)
module.exports = CreatorsModel