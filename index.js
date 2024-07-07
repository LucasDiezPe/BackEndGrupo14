import express from 'express';
import pool from './config/db.js';
//import 'dotenv/config';

const app = express();

const puerto = process.env.PORT || 3000;

// Usar Json como dato de salida de las consultas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Consultar la base de datos
app.get('/perrosdisponibles', async (req, res) => {
    const sql = `SELECT perrosdisponbles.Nombre, perrosdisponbles.Caracter,
                perrosdisponbles.Edad_Aprox AS Edad, perrosdisponbles.Castración,
                 raza.Raza_Nombre AS Raza, sizes.Size_name AS Tamaño,
                  req_hogar.Tipo AS HogarIdeal 
                  FROM perrosdisponbles 
                  JOIN Raza ON perrosdisponbles.Raza=raza.Raza_id 
                  JOIN req_hogar ON perrosdisponbles.Hogar_Necesario=req_hogar.Req_id 
                  JOIN sizes ON perrosdisponbles.Tamaño_Estimado=sizes.Size_id 
                  ORDER By perrosdisponbles.Nombre;`;

    try {
        const connection = await pool.getConnection()
        const [resConsulta] = await connection.query(sql);
        connection.release();
        res.json(resConsulta);

    } catch (error) {
        res.send(500).send('Internal server error')
    }

});

// Consulta por id de perro
app.get('/perrosdisponibles/:id', async (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM perrosdisponbles WHERE Id_Perro = ?`

    try {
        const connection = await pool.getConnection()
        const [resConsulta] = await connection.query(sql, [id]);
        connection.release();
        console.log("Compa Canino --> ", resConsulta)
        res.json(resConsulta[0]);
    } catch (error) {
        res.send(500).send('Internal server error')
    }
});
/*
// Create a new resource
app.post('/productos', async (req, res) => {

    const producto = req.body;

    const sql = `INSERT INTO productos SET ?`;

    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [producto]);
        connection.release();
        res.send(`
            <h1>Producto creado con id: ${rows.insertId}</h1>
        `);
    } catch (error) {
        res.send(500).send('Internal server error')
    }
});

// Update a specific resource
app.put('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const producto = req.body;

    const sql = `UPDATE productos SET ? WHERE id_producto = ?`;

    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [producto, id]);
        connection.release();
        console.log(rows)
         res.send(`
            <h1>Producto actualizado id: ${id}</h1>
        `);
    } catch (error) {
        res.send(500).send('Internal server error')
    }

});

// Delete a specific resource
app.delete('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM productos WHERE id_producto = ?`;

     try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        console.log(rows)
         res.send(`
            <h1>Producto borrado id: ${id}</h1>
        `);
    } catch (error) {
        res.send(500).send('Internal server error')
    }
});
*/
// Start the server
app.listen(puerto, () => {
    console.log('Servidor escuchando en puerto 3000');
});