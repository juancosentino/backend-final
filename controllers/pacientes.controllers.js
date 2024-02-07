const PacientesModel = require('../models/pacientes.schema')

const createPaciente = async(req, res) => {
    try {
      const nuevoPaciente = new PacientesModel(req.body);
      const pacienteGuardado = await nuevoPaciente.save();
      res.status(201).json({ message: 'Turno creado con éxito', paciente: pacienteGuardado });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el turno', error });
    }
};

const getAllPacientes = ('/', async (req, res) => {
    try {
      const pacientes = await PacientesModel.find();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los turnos', error });
    }
});

const getOnePaciente = async (req, res) => {
    try {
      const paciente = await PacientesModel.findById(req.params.id);
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el paciente', error });
    }
};

const updatePaciente = async (req, res) => {
    try {
      const pacienteActualizado = await PacientesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!pacienteActualizado) {
        return res.status(404).json({ message: 'Paciente no encontrado para actualizar' });
      }
      res.json({ message: 'Paciente actualizado con éxito', turno: pacienteActualizado });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el paciente', error });
    }
};

const deletePaciente = async (req, res) => {
    try {
      const pacienteEliminado = await PacientesModel.findByIdAndDelete(req.params.id);
      if (!pacienteEliminado) {
        return res.status(404).json({ message: 'Paciente no encontrado para eliminar' });
      }
      res.json({ message: 'Paciente eliminado con éxito', turno: pacienteEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el paciente', error });
    }
};

module.exports = {
    createPaciente,
    getAllPacientes,
    getOnePaciente,
    updatePaciente,
    deletePaciente
}