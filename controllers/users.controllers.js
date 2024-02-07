/* req - request -> frontend me envia al backend */
/* res - response -> backend envia al frontend */

const UsersModel = require("../models/users.schema")
const bycriptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const createUser = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({msg: errors.array()})
        }
        const { emailUsuario, contrasenia } = req.body
        const userExist = await UsersModel.findOne({emailUsuario})

        if(userExist){
            res.status(400).json({msg: 'Usuario existe en la base de datos'})
            return
        }

        const newUser = new UsersModel(req.body)

        const salt = bycriptjs.genSaltSync(10)
        newUser.contrasenia = bycriptjs.hashSync(contrasenia, salt)

        await newUser.save()
        res.status(201).json({msg: 'Usuario creado con exito', newUser})
    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor 1', error})
    }
}

const getUser = async(req, res) => {
    try {
        const getAllUsers = await UsersModel.find()
        res.status(200).json({msg: 'Usuarios', getAllUsers})
    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const getOneUser = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({msg: errors.array()})
        }

        const getUser = await UsersModel.findOne()
        res.status(200).json({msg: 'Usuario encontrado', getUser})
    } catch (error) {
        res.status(400).json({msg: 'Falla en el servidor', error})
    }
}

const updateUser = async(req, res) => {
    try {
        const updateOneUser = await UsersModel.findByIdAndUpdate({_id: req.params.id},
            req.body, {new: true})
        res.status(200).json({msg: 'Usuario actualizado', updateOneUser})
    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const deleteUser = async(req, res) => {
    try {
        const userExiste = await UsersModel.findOne({_id: req.params.id})
        
        if(!userExiste){
            res.status(400).json({msg: 'ID incorrecto. No existe en la base de datos'})
        }
        
        await UsersModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: 'Usuario eliminado'})
    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const loginUser = async(req, res) => {
    try {
        const { emailUsuario, contrasenia } = req.body
        const userExist = await UsersModel.findOne({emailUsuario})

        if(!userExist){
            res.status(400).json({msg: 'Usuario y/o contraseña incorrecta'})
            return
        }

        const passCheck = bycriptjs.compareSync(contrasenia, userExist.contrasenia)

        if(!passCheck){
            res.status(400).json({msg: 'Usuario y/o contraseña incorrecta'})
            return
        }

        const payload = {
            id: userExist._id,
            role: userExist.role
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).json({msg: 'Logueado', token, role: userExist.role, usuario: userExist.nombreUsuario})
    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

module.exports = {
    createUser,
    getUser,
    getOneUser,
    updateUser,
    deleteUser,
    loginUser
}