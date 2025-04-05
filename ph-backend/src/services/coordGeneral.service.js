const CoordGeneralModel = require("../models/coordGeneral.model");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../utils/jwtGenerate");

const CoordGeneralService = {
    async verificarCredenciales(username, password) {

        // Obtener el password de la coordinadora general
        const { id_coord_general, nombre, hash }  = await CoordGeneralModel.getNameAndPassword(username);

        // Verificar si el usuario existe
        if (!hash) {
            throw new Error("El usuario ingresado no existe");
        }

        // Verificar si la contraseña ingresada coincide con el hash almacenado
        const match = await bcrypt.compare(password, hash);
        if (!match) {
            throw new Error("Credenciales inválidas");
        }

        // Generar un token JWT
        const token = jwtGenerate(username, password);

        // Crear el objeto para subir los datos a la base de datos
        const tokenData = {
            id_coord_general,
            token
        }

        // Subir el token a la base de datos
        await CoordGeneralModel.subirToken(tokenData);
        return [nombre, token];
    },
    async expirarToken(username) {
        const id_coord_general = await CoordGeneralModel.getId(username);

        // Generar un timestamp para la expiración del token
        const timestamp = new Date();

        // Obtener el último registro del token
        const { created_at } = await CoordGeneralModel.getLastTokenRegister(id_coord_general);
        
        // Expirar el token de la coordinadora general
        await CoordGeneralModel.expireToken(id_coord_general, created_at, timestamp);
    }
}

module.exports = CoordGeneralService;