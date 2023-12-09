const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaPago = new Schema({
    nombreTarjeta: {
        type: String,
        required: true,
    },
    numeroTarjeta: {
        type: Number,
        required: true,
    },
    fechaTarjeta: {
        type: String,
        required: true,
    },
    cvvTarjeta: {
        type: Number,
        required: true,
    },
});

const schemaNegocio = new Schema({
    nombreNegocio: {
        type: String,
        required: true,
    },
    categoriaNegocio: {
        type: String,
        required: true,
    },
    descripcionNegocio: {
        type: String,
        required: true,
    },
    correoNegocio: {
        type: String,
        required: true,
    },
    provinciaNegocio: {
        type: String,
        required: true,
    },
    cantonNegocio: {
        type: String,
        required: true,
    },
    distritoNegocio: {
        type: String,
        required: true,
    },
    senasNegocio: {
        type: String,
        required: true,
    },
    fotosNegocio: {
        type: Array,
        required: true,
    },
});

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
            type: String,
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
        cel: {
            type: Number,
            required: true,
        },
        imagen: {
            type: String,
            required: false,
        },

        role: {
            type: String,
            enum: ['usuario', 'admin', 'negocio'],
        },
        pago: [schemaPago],
        negocio: [schemaNegocio],
    },
    {
        timestamps: true,
    }
);

const modeloUsuario = mongoose.model('Usuario', schemaUsuario);
module.exports = modeloUsuario;
