const MySQLConnection = require('../database/mysql');

const getAllServicioss = async () => {
    let connection
    try {
        connection = await MySQLConnection();
        const [servicio] = await connection.execute('SELECT id, litrosAproximados, tipoCombustible, kilometraje, fecha FROM registroCombustible');
  
      if (servicio.length === 0) {
          console.log('No se enconto ningun registro de combustible');
          return { success: false, message: 'No se enconto ningun registro de combustible' };
      } else {
          console.log('El registro de combustible se encontro exitosamente');
          return { success: true, servicio: servicio };
      }  
  
      } catch (error) {
        console.error('Error al obtener los datos de la tabla:', error);
        throw new Error('Error al obtener los datos de la tabla');
      } finally {
          connection.close()
      }
};

const getServiciosPorRangoFechass = async (fechaInicio, fechaFin) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const query = 'SELECT id, litrosAproximados, tipoCombustible, kilometraje, fecha FROM registroCombustible WHERE fecha BETWEEN ? AND ?';
        const [servicios] = await connection.execute(query, [fechaInicio, fechaFin]);

        if (servicios.length === 0) {
            console.log('No se encontró ningún registro de combustible en el rango de fechas especificado');
            return { success: false, message: 'No se encontró ningún registro de combustible en el rango de fechas especificado' };
        } else {
            console.log('Registros de combustible encontrados exitosamente');
            return { success: true, servicios: servicios };
        }
    } catch (error) {
        console.error('Error al obtener los datos de la tabla:', error);
        throw new Error('Error al obtener los datos de la tabla');
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

module.exports = { getAllServicioss, getServiciosPorRangoFechass };