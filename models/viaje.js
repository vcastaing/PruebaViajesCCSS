const MySQLConnection = require('../database/mysql');

const createViaje = async (viajeData) => {
  try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute('INSERT INTO Viaje (nombreSecretaria, nombreChofer) VALUES (?, ?)', [
          viajeData.nombreSecretaria,
          viajeData.nombreChofer,
      ]);
      console.log('El viaje se registro exitosamente');
      return rows;
  } catch (error) {
      console.error('Error al registrar el viaje:', error);
      throw new Error('Error al registrar el viaje');
  }
};

const getAllviajes = async () => {
  try {
      const connection = await MySQLConnection();
      const [viaje] = await connection.execute('SELECT * FROM Viaje');
      return viaje;
  } catch (error) {
      console.error('Error al obtener los datos de la tabla:', error);
      throw new Error('Error al obtener los datos de la tabla');
  }
};

const eliminateViaje = async (idViaje) => {
    try {
        const connection = await MySQLConnection();
        console.log(`id models delete: ${idViaje}`);
        const [rows, fields] = await connection.execute('DELETE FROM Viaje WHERE idViaje = ?', [idViaje]);
        console.log('El viaje se elimino exitosamente');
      return rows;
    } catch (error) {
        console.error('Error al eliminar el viaje:', error);
        throw new Error('Error al eliminar el viaje');
    }
}

const updatingViaje = async (idViaje, viajeData) => {
    try {
        const connection = await MySQLConnection();
        console.log(`id models update: ${idViaje}`);
        console.log(`nuevos datos models:`, viajeData);

        if (viajeData.nombreSecretaria === undefined || viajeData.nombreChofer === undefined) {
            throw new Error('hay parámetros undefined en models');
        }

        const [rows, fields] = await connection.execute('UPDATE Viaje SET nombreSecretaria=?, nombreChofer=? WHERE idViaje=?', 
        [viajeData.nombreSecretaria, viajeData.nombreChofer, idViaje]);
        console.log('El viaje se actualizo exitosamente');
        return rows;
    } catch (error) {
        console.error('Error al actualizar el viaje:', error);
        throw new Error('Error al actualizar el viaje');
    }
}

module.exports = { createViaje, getAllviajes, eliminateViaje, updatingViaje};