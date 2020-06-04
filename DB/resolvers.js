const Usuario = require("../models/usuarios")
const bcrypt = require("bcryptjs")
require('dotenv').config({ path: 'variables.env' });
const jwt = require("jsonwebtoken");

const crearToken = (usuario, secreta, expiracion) => {
    const { id, email, nombre, apellido, } = usuario
    return jwt.sign({ id }, secreta, expiracion)
}

const resolvers = {
    Query:{
        obtenerUsuario: async (_, { token }) => {
            const usuarioId = await jwt.verify(token, process.env.SECRETA)
            return usuarioId
        },
    },
    Mutation:{
         //USUARIOS
        nuevoUsuario: async (_, { input }) => {
            const { email, password } = input
            const existeUsuario = await Usuario.findOne({ email })
            if (existeUsuario) throw new Error("Usuario ya registrado");

            const salt = bcrypt.getSalt(10)

            input.password = await bcrypt.hash(password, salt)

            try {
                const usuario = new Usuario(input);
                usuario.save()
                return usuario
            }
            catch (error) {
                console.log(error)
            }

        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input
            const existeUsuario = await Usuario.findOne({ email })
            if (!existeUsuario) throw new Error("Usuario No existe");
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto) throw new Error("password Incorrecto");

            return {
                token: crearToken(existeUsuario, process.env.SECRETA, "24h")
            }

        },
    }
}

module.exports = resolvers