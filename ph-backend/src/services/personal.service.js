// personal.service.js
// Descripción: Lógica de negocio para la gestión de personal.

const PersonalModel = require("../models/personal.model");
const Mailer = require("../../config/mailer/Mailer");
const NotifyColaboradoraRegister = require("../../config/mailer/notifyColaboradoraRegister/notifyColaboradoraRegister");

const PersonalService = {
    async registrarPersonal(personal, id_sede) {
        // Añadir el id de la sede de participación al personal
        personal.id_sede = id_sede;

        await PersonalModel.createPersonal(personal);

        // Enviar correo de confirmación
        const mailer = new Mailer(new NotifyColaboradoraRegister());
        await mailer.sendEmail(personal.nombre, personal.correo);
    },
}

module.exports = PersonalService;