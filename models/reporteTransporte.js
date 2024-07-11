const MySQLConnection = require('../database/mysql');

const getAllServicioss = async () => {
    let connection
    try {
        connection = await MySQLConnection();
        const [servicio] = await connection.execute('SELECT * FROM Viaje');
  
      if (servicio.length === 0) {
          console.log('No se enconto ningun viaje');
          return { success: false, message: 'No se enconto ningun viaje' };
      } else {
          console.log('El viaje se encontro exitosamente');
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