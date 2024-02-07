const PacientesModel = require('../models/turnos.schema')

const createTurno = async(req, res) => {
    try {
      const nuevoPaciente = new PacientesModel(req.body);
      const pacienteGuardado = await nuevoPaciente.save();
      res.status(201).json({ message: 'Turno creado con éxito', paciente: pacienteGuardado });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el turno', error });
    }
};

const getAllTurnos = ('/', async (req, res) => {
    try {
      const turnos = await PacientesModel.find();
      res.json(turnos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los turnos', error });
    }
});

const getOneTurno = async (req, res) => {
    try {
      const turno = await PacientesModel.findById(req.params.id);
      if (!turno) {
        return res.status(404).json({ message: 'Turno no encontrado' });
      }
      res.json(turno);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el turno', error });
    }
};

const updateTurno = async (req, res) => {
    try {
      const turnoActualizado = await PacientesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!turnoActualizado) {
        return res.status(404).json({ message: 'Turno no encontrado para actualizar' });
      }
      res.json({ message: 'Turno actualizado con éxito', turno: turnoActualizado });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el turno', error });
    }
};

const deleteTurno = async (req, res) => {
    try {
      const turnoEliminado = await PacientesModel.findByIdAndDelete(req.params.id);
      if (!turnoEliminado) {
        return res.status(404).json({ message: 'Turno no encontrado para eliminar' });
      }
      res.json({ message: 'Turno eliminado con éxito', turno: turnoEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el turno', error });
    }
};

const deleteTurnos = async (req, res) => {
    try {
      const turnosEliminado = await PacientesModel.find();
      if (!turnosEliminado) {
        return res.status(404).json({ message: 'Turnos no encontrado para eliminar' });
      }
      res.json({ message: 'Turnos eliminado con éxito', turno: turnosEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar los turnos', error });
    }
};

module.exports = {
    createTurno,
    getAllTurnos,
    getOneTurno,
    updateTurno,
    deleteTurno,
    deleteTurnos
}