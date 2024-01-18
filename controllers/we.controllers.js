const CreatorsModel = require("../models/we.schema")

const createCreator = async(req, res) => {
    try {
        
        const {name, img} = req.body

        if(!name || !img){
            res.status(400).json({msg: 'Algun campo esta vacio'})
            return 
        }

        const newCreator = new CreatorsModel(req.body) /* formulario completo */
        await newCreator.save()
        res.status(201).json({msg: 'Creador añadido', newCreator})

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const getCreators = async(req, res) => {
    try {
        const getAllCreators = await CreatorsModel.find()
        res.status(201).json({msg: 'Creadores encontrados', getAllCreators})

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor o no hay creator registrados', error})
    }
}

const updateCreator = async(req, res) => {
    try {
        
        const updateCreator = await CreatorsModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.status(200).json({msg: 'Creador actualizado', updateCreator})
 
    } catch (error) {
      res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const deleteCreator = async(req, res) => {
    try {
        
        const creatorExist = await CreatorsModel.findOne({_id: req.params.id})

        if(!creatorExist){
            res.status(400).json({msg: 'El creador que intentas borrar no existe'}) 
        }

        await CreatorsModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: 'Creador eliminado'}) 

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

module.exports = {
    createCreator,
    getCreators,
    updateCreator,
    deleteCreator
}