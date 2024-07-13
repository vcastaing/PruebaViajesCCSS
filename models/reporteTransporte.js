const MySQLConnection = require('../database/mysql');

const getAllServicioss = async () => {
    let connection
    try {
        connection = await MySQLConnection();
        const [servicio] = await connection.execute('SELECT id, litrosAproximados, kilometraje, fecha FROM registroCombustible');
  
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

module.exports = { getAllServicioss };