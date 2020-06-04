const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    creado: {
        type: String,
        require: true,
        default: Date.now(),
        trim: true
    },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);