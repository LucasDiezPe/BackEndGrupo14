import { createPool } from 'mysql2/promise';

// creacion de pool de conexiones
const pool = createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    connectionLimit: 5 // limite de conexiones
});

//prueba de conexión 
pool.getConnection()
    .then(connection => {
        console.log('Estas conectado a la base  de datos refugiocanino');
        connection.release();
    })
    .catch(error => {
        console.log('Error en la conexion a la Base de Datos', error);
    });


export default pool;