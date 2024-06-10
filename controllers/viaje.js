const viaje = require('../models/viaje');
const { createViaje, getAllviajes, eliminateViaje, updatingViaje, getAllviajesById } = require('../models/viaje');

const postViaje = async (req, res) => {
    const viajeData = req.body;
    try {
        if (!viajeData.FechaInicio) {
          viajeData.FechaInicio = new Date();
        }

        const newViaje = await createViaje(viajeData);
        res.status(201).json({ message: 'Viaje registrado exitosamente', viaje: newViaje });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar el viaje' });
    }
};

const getAllviajess = async (req, res) => {
  try {
    const viaje = await getAllviajes();
    res.json({ message: 'Viajes obtenidos correctamente', viaje });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
};

const getAllviajessById = async (req, res) => {
  const idViaje = req.params.idViaje;
  console.log(`id controllers get: ${idViaje}`);
  try {
    const viaje = await getAllviajesById(idViaje);
    res.json({ message: 'Viajes obtenidos correctamente', viaje });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
};

const deleteViaje = async (req, res) => {
  const idViaje = req.params.idViaje;
  console.log(`id controllers delete: ${idViaje}`);
  try {
    const delViaje = await eliminateViaje(idViaje);
    res.status(201).json({ message: 'Viaje eliminado exitosamente', viaje: delViaje });
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar el viaje' });
  }
};

const updateViaje = async (req, res) => {
  const idViaje = req.params.idViaje;
  const { Unidad, FechaInicio, Paciente, LugarSalida, LugarDestino, Condicion, HoraCita, Ruta, Posicion, Acciones } = req.body; 

  console.log(`id controllers updating: ${idViaje}`);
  try {
    const updViaje = await updatingViaje(idViaje, { Unidad, FechaInicio, Paciente, LugarSalida, LugarDestino, Condicion, HoraCita, Ruta, Posicion, Acciones });
    res.status(201).json({ message: 'Viaje actualizado exitosamente', viaje: updViaje });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el viaje' });
  }

}

module.exports = { postViaje, getAllviajess, deleteViaje, updateViaje, getAllviajessById };