const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaUsuario = new Schema(
    {
        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
        fechaNacimiento: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        provincia: String,
        canton: String,
        distrito: String,
        direccionExacta: String,

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const modeloUsuario = mongoose.model('Usuario', schemaUsuario);
module.exports = modeloUsuario;
