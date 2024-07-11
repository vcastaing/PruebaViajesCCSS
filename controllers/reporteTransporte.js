const servicio = require('../models/reporteTransporte');
const { getAllServicioss } = require('../models/reporteTransporte');

const getAllServicios = async (req, res) => {
    try {
        const servicio = await getAllServicioss();
    
        if (servicio.success) {
          res
            .status(200)
            .json({ message: servicio.message, servicio: servicio.servicio });
        } else {
          res.status(404).json({ message: viajeAll.message });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los viajes" });
      }
};

// const getAllServiciosById = async (req, res) => {
//   const idViaje = req.params.idViaje;
//   console.log(`id controllers get: ${idViaje}`);
//   try {
//     const viaje = await getAllviajesById(idViaje);
//     res.json({ message: 'Viajes obtenidos correctamente', viaje });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener los viajes' });
//   }
// };

module.exports = { getAllServicios };