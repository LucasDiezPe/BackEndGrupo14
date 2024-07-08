import express from 'express';
import pool from './config/db.js';
import 'dotenv/config';

const app = express();

const puerto = process.env.PORT || 3000;

// Usar Json como dato de salida de las consultas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Consultar la base de datos
app.get('/perrosdisponibles', async (req, res) => {
    const sql = `SELECT perrosdisponbles.id, perrosdisponbles.Nombre, perrosdisponbles.Caracter,
                perrosdisponbles.Edad_Aprox AS Edad, perrosdisponbles.Castración,
                 raza.Raza_Nombre AS Raza, sizes.Size_name AS Tamaño,
                  req_hogar.Tipo AS HogarIdeal 
                  FROM perrosdisponbles 
                  JOIN Raza ON perrosdisponbles.Raza=raza.Raza_id 
                  JOIN req_hogar ON perrosdisponbles.Hogar_Necesario=req_hogar.Req_id 
                  JOIN sizes ON perrosdisponbles.Tamaño_Estimado=sizes.Size_id 
                  ORDER By perrosdisponbles.Nombre`

    try {
        const connection = await pool.getConnection()
        const [resConsulta] = await connection.query(sql);
        connection.release();
        res.json(resConsulta);

    } catch (error) {
        res.sendStatus(500).send('Internal server error')
    }

});

// Consulta por id de perro
app.get('/perrosdisponibles/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT perrosdisponbles.id, perrosdisponbles.Nombre, perrosdisponbles.Caracter,
       perrosdisponbles.Edad_Aprox AS Edad, perrosdisponbles.Castración,
       raza.Raza_Nombre AS Raza, sizes.Size_name AS Tamaño,
       req_hogar.Tipo AS HogarIdeal 
FROM perrosdisponbles 
JOIN Raza ON perrosdisponbles.Raza=raza.Raza_id 
JOIN req_hogar ON perrosdisponbles.Hogar_Necesario=req_hogar.Req_id 
JOIN sizes ON perrosdisponbles.Tamaño_Estimado=sizes.Size_id 
WHERE perrosdisponbles.id = ?
ORDER BY perrosdisponbles.Nombre;`;

    try {
        const connection = await pool.getConnection();
        const [resConsulta] = await connection.query(sql, [id]);
        connection.release();
        console.log("Compa Canino --> ", resConsulta);
        res.json(resConsulta[0]);
    } catch (error) {
        res.status(500).send('Internal server error'); // Utiliza res.status() para enviar el código de estado y luego res.send() para enviar el mensaje
    }
});

// Crear un nuevo Perro
app.post('/perrosdisponibles', async (req, res) => {
    const perro = req.body;

    const sql = `INSERT INTO perrosdisponbles SET ?`; 

    try {
        const connection = await pool.getConnection();
        const [resConsulta] = await connection.query(sql, perro); // Corregido: pasando perro directamente, no como un array
        connection.release();

        // Enviar una respuesta exitosa con el número de perro insertado
        res.send(`<h1>Se ha agregado un nuevo perro con ID: ${resConsulta.insertId}</h1>`);
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        console.error('Error al insertar perro:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Actualiar un registro de perro
app.put('/perrosdisponibles/:id', async (req, res) => {
    const id = req.params.id;
    const perro = req.body;

    const sql = `UPDATE perrosdisponbles SET ? WHERE id = ?`;

    try {
        const connection = await pool.getConnection()
        const [resConsulta] = await connection.query(sql, [perro, id]);
        connection.release();
        console.log(resConsulta)
         res.send(`
            <h1>Registro de Perro Actualizado N°: ${id}</h1>
        `);
    } catch (error) {
        res.sendStatus(500).send('Internal server error')
    }

});

// Eliminar un registro de Perros Disponiibles
app.delete('/perrosdisponibles/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM perrosdisponbles WHERE id = ?`;

    try {
        const connection = await pool.getConnection();
        const [resConsulta] = await connection.query(sql, [id]);
        connection.release();

        if (resConsulta.affectedRows === 0) {
            return res.status(404).send('No se encontró un perro con ese ID');
        }

        res.send(`<h1>El registro eliminado fue el N°: ${id}</h1>`);
    } catch (error) {
        console.error('Error al eliminar perro:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto 3000');
});
