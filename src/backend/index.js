const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

//Conexion a MongoDB

mongoose
    .connect(
        'mongodb+srv://jalemanh:d3H8cioJfqmTV2Jr@webdevilsdb.hh5dl7p.mongodb.net/test?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log(
            'Conexión a la base de datos exitosa, conectado a BD SyncTravel'
        );
    })
    .catch((error) => {
        console.error('Error en la conexión a la base de datos:', error);
    });

const modeloUsuario = require('./model/userModel');

// Rutas de usuarios

app.post('/api/users/new', async (req, res) => {
    console.log('POST usuarios\n', req.body);
    try {
        if (!req.body) {
            console.log('Error al obtener datos del usuario');
            res.status(400).send('No hay datos para procesar');
            return;
        }
        const nuevoUsuario = new modeloUsuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fechaNacimiento: req.body.fechaNacimiento,
            id: req.body.id,
            provincia: req.body.provincia,
            canton: req.body.canton,
            distrito: req.body.distrito,
            direccionExacta: req.body.direccionExacta,
            correo: req.body.correo,
            password: req.body.password,
        });

        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json(usuarioGuardado._id);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
        return;
    }
});

app.get('/api/users', async (req, res) => {
    console.log('GET usuarios');
    const condiciones = {};

    if (req.query.id) {
        condiciones.id = req.query.id;
    }

    if (req.query.correo) {
        condiciones.correo = req.query.correo;
    }

    if (req.query.apellido) {
        condiciones.apellido = req.query.apellido;
    }

    if (req.query.nombre) {
        condiciones.nombre = req.query.nombre;
    }

    try {
        const usuarios = await modeloUsuario.find(condiciones);
        console.log('Usuarios encontrados', usuarios);
        res.status(200).send(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener usuarios');
    }
});

app.patch('/api/users/:id', async (req, res) => {
    console.log('PATCH usuarios');
    if (!req.body) {
        console.log('Error al obtener datos del usuario');
        res.status(400).send('No hay datos para procesar');
        return;
    }
    try {
        const id = req.params.id;
        const usuarioModificado = await modeloUsuario.findByIdAndUpdate(id, {
            ...req.body,
        });
        console.log('Usuario modificado', usuarioModificado);
        res.status(200).send(usuarioModificado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar usuario');
        return;
    }
});

app.delete('/usuarios', async (req, res) => {
    console.log('DELETE usuarios');
    try {
        const id = req.query.id;
        const usuarioEliminado = await modeloUsuario.findByIdAndDelete(id);
        console.log('Usuario eliminado', usuarioEliminado);
        res.status(200).send(usuarioEliminado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar usuario');
        return;
    }
});

// Ruta de escucha: http://localhost:3000
app.listen(3000, function () {
    console.log(`Servidor en puerto 3000`);
});
