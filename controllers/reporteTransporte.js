const servicio = require('../models/reporteTransporte');
const { getServiciosPorRangoFechass } = require('../models/reporteTransporte');

const getServiciosPorRangoFechas = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  try {
      const servicio = await getServiciosPorRangoFechass(fechaInicio, fechaFin);
  
      if (servicio.success) {
        res
          .status(200)
          .json({ message: servicio.message, servicio: servicio.servicios });
      } else {
        res.status(404).json({ message: servicio.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los registros por rango de fechas" });
    }
};

module.exports = { getServiciosPorRangoFechas };