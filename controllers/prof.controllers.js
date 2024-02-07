const Doctor = require('../models/prof.schema');

const crearDoctor = async (req, res) => {
  try {
    const { nombre, apellido, correo, especialidad } = req.body;

    if (!nombre || !apellido || !correo ||!especialidad){
        return res.status(400).json({ msg: 'Algun campo está vacío' });
    }

    const nuevoDoctor = new Doctor({
      nombre,
      apellido,
      correo,
      especialidad,
    });

    await nuevoDoctor.save();

    res.status(201).json({ mensaje: 'Doctor creado con éxito', nuevoDoctor });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const obtenerDoctores = async (req, res) => {
  try {
    const doctores = await Doctor.find();
    res.status(200).json({ mensaje: 'Doctores encontrados', doctores });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const actualizarDoctor = async(req, res) => {
    try {
        
       const actualizarDoctor = await Doctor.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
       res.status(200).json({msg: 'Producto actualizado', actualizarDoctor})

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const eliminarDoctor = async(req, res) => {
    try {
        
        const doctorExiste = await Doctor.findOne({_id: req.params.id})

        if(!doctorExiste){
            res.status(400).json({msg: 'El Doctor que intentas borrar no existe'}) 
        }

        await Doctor.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: 'Doctor eliminado de la base de datos'}) 

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const obtenerUnDoctor = async(req, res) => {
    try{
        const obtenerDoctor = await Doctor.findOne({_id: req.params.id})
        res.status(200).json({msg: 'Doctor encontrado', obtenerDoctor}) 

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

module.exports = {
  crearDoctor,
  obtenerDoctores,
  actualizarDoctor,
  eliminarDoctor,
  obtenerUnDoctor
  // Agregar otros métodos según sea necesario
};
