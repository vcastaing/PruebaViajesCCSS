const MySQLConnection = require('../database/mysql');

const getServiciosPorRangoFechass = async (fechaInicio, fechaFin) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const query = `
    SELECT id, litrosAproximados, tipoCombustible, kilometraje, fecha, 
           (SELECT COUNT(*) FROM Viaje WHERE EstadoViaje = 'finalizado') AS TotalGirasEfectuadas
    FROM registroCombustible WHERE fecha BETWEEN ? AND ? `;
        const [servicios] = await connection.execute(query, [fechaInicio, fechaFin]);

        if (servicios.length === 0) {
            console.log('No se encontró ningún registro de combustible en el rango de fechas especificado');
            return { success: false, message: 'No se encontró ningún registro de combustible en el rango de fechas especificado' };
        } else {
            console.log('Registros de combustible encontrados exitosamente');
            console.log('Número de viajes finalizados:', servicios[0].numeroDeViajesFinalizados);
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

module.exports = { getServiciosPorRangoFechass };