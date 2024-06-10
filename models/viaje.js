const MySQLConnection = require('../database/mysql');

const createViaje = async (viajeData) => {
  try {
      const connection = await MySQLConnection();
      console.log(`prueba: ${JSON.stringify(viajeData)}`);
      const [rows, fields] = await connection.execute('INSERT INTO Viaje (Unidad, FechaInicio, Paciente, LugarSalida, LugarDestino, Condicion, HoraCita, Ruta, Posicion, Acciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        viajeData.Unidad, 
        viajeData.FechaInicio,
        viajeData.Paciente,
        viajeData.LugarSalida,
        viajeData.LugarDestino,
        viajeData.Condicion,
        viajeData.HoraCita,
        viajeData.Ruta,
        viajeData.Posicion,
        viajeData.Acciones,
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

const getAllviajesById = async (idViaje) => {
    try {
        const connection = await MySQLConnection();
        console.log(`id models get: ${idViaje}`);
        const [viaje] = await connection.execute('SELECT * FROM Viaje WHERE idViaje = ?', [idViaje]);
        console.log('El viaje se encontro exitosamente');
        return viaje[0];
      return rows;
    } catch (error) {
        console.error('Error al obtener el viaje:', error);
        throw new Error('Error al obtener el viaje');
    }
}

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

        let updateFields = '';
        const updateValues = [];

        for (const key in viajeData) {
            if (viajeData.hasOwnProperty(key) && key !== 'idViaje' && viajeData[key] !== undefined) {
                updateFields += `${key} = ?, `;
                updateValues.push(viajeData[key]);
            }
        }

        updateFields = updateFields.slice(0, -2);

        updateValues.push(idViaje);

        const query = `UPDATE Viaje SET ${updateFields} WHERE idViaje = ?`;

        const [rows, fields] = await connection.execute(query, updateValues);
        console.log('El viaje se actualizo exitosamente');
        return rows;
    } catch (error) {
        console.error('Error al actualizar el viaje:', error);
        throw new Error('Error al actualizar el viaje');
    }
}

module.exports = { createViaje, getAllviajes, eliminateViaje, updatingViaje, getAllviajesById};