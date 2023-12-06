const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const enviarCorreo = require('../backend/email');
const randomPassword = require('../backend/recuperacionContrasenna');

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
const cambioContrasenna = require('../backend/recuperacionContrasenna');

// Rutas de usuarios

/* REALIZA UN NUEVO USUARIO, REGISTRAR USUARIO NUEVO */

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
            cel: req.body.cel,
            imagen: req.body.imagen,
            role: 'usuario',
        });
        const usuarioGuardado = await nuevoUsuario.save();

        await enviarCorreo('', req.body.correo, req.body.password);
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
        return;
    }
});

/* REALIZA UN NUEVO NEGOCIO, REGISTRAR NEGOCIO NUEVO */

app.post('/api/negocio/nuevo/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    console.log(req.body);

    try {
        const usuario = await modeloUsuario.findById(idUsuario);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const {
            nombreNegocio,
            categoriaNegocio,
            descripcionNegocio,
            correoNegocio,
            provinciaNegocio,
            cantonNegocio,
            distritoNegocio,
            senasNegocio,
            fotosNegocio,
        } = req.body;
        const nuevoNegocio = {
            nombreNegocio,
            categoriaNegocio,
            descripcionNegocio,
            correoNegocio,
            provinciaNegocio,
            cantonNegocio,
            distritoNegocio,
            senasNegocio,
            fotosNegocio,
        };
        usuario.negocio.push(nuevoNegocio);
        await usuario.save();
        res.status(201).json({ mensaje: 'Negocio creado exitosamente' });
    } catch (error) {
        console.error('Error al crear negocio:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

/* REALIZA EL LOGIN A LA APLICACION WEB MEDIANTE 
CORREO Y CONTRASEñA */

app.post('/api/users/login', async (req, res) => {
    console.log('POST login\n', req.body);
    try {
        if (!req.body) {
            console.log('Error al obtener datos del usuario');
            res.status(400).send('No hay datos para procesar');
            return;
        }
        const usuario = await modeloUsuario.findOne({
            correo: req.body.correo,
            password: req.body.password,
        });
        if (!usuario) {
            res.status(401).send('Usuario no encontrado');
            return;
        }
        res.status(200).send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
        return;
    }
});

/* REALIZA UNA SOLICITUD POR CORREO PARA 
UNA CONTRASEñA PROVISIONAL POR OLVIDO */

app.patch('/api/users/recuperarContrasenna', async (req, res) => {
    console.log('PATCH recuperarContrasenna\n', req.body.correo);
    try {
        const correo = req.body.correo || req.params.correo;
        if (!correo) {
            console.log('Error al obtener datos del usuario');
            res.status(400).send('No hay datos para procesar');
            return;
        }

        const nuevaContrasenna = await cambioContrasenna(correo);
        if (!nuevaContrasenna) {
            console.error('Error al generar la nueva contraseña');
            res.status(500).json({ error: 'Error al procesar la solicitud' });
            return;
        }

        await modeloUsuario.findOneAndUpdate(
            { correo: correo },
            { $set: { password: nuevaContrasenna } }
        );

        const usuario = await modeloUsuario.findOne({ correo: correo });
        res.status(200).send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

/* REALIZA EL CAMBIO DE CONTRASEñA DESDE 
EL APARTADO DE SEGURIDAD */

app.patch('/api/users/cambiar-contrasena/:id', async (req, res) => {
    console.log('PATCH cambiar-contrasena');
    const idUsuario = req.params.id;
    const { contrasenaActual, nuevaContrasena } = req.body;
    try {
        const usuario = await modeloUsuario.findById(idUsuario);
        if (!usuario) {
            console.log('Usuario no encontrado');
            res.status(404).send('Usuario no encontrado');
            return;
        }

        if (usuario.password !== contrasenaActual) {
            console.log('Contraseña actual incorrecta');
            res.status(401).send('Contraseña actual incorrecta');
            return;
        }
        usuario.password = nuevaContrasena;
        await usuario.save();
        console.log('Contraseña actualizada');
        res.status(200).send('Contraseña actualizada');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cambiar la contraseña');
    }
});

/* REALIZA EL UPLOAD DE FOTO DE PERFIL A CLOUDINARY 
DESDE EL APARTADO DE USUARIO */

app.patch('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        if (updatedUserData.imagen) {
            const updatedUser = await modeloUsuario.findByIdAndUpdate(
                userId,
                { $set: { imagen: updatedUserData.imagen } },
                { new: true }
            );
            res.json(updatedUser);
        } else {
            const updatedUser = await modeloUsuario.findByIdAndUpdate(
                userId,
                updatedUserData,
                { new: true }
            );
            res.json(updatedUser);
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar usuario');
    }
});

/* GET DE LOS USUARIOS Y SUS DATOS */

app.get('/api/users/:id', async (req, res) => {
    console.log('GET usuariosS');
    try {
        const id = req.params.id;
        const usuario = await modeloUsuario.findById(id);
        console.log('Usuario encontrado', usuario);
        res.status(200).send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener usuario');
    }
});

app.delete('/api/users/:id', async (req, res) => {
    console.log('DELETE usuarios');
    try {
        const id = req.params.id;
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
