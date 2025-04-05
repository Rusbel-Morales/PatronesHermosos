// participante.service.js
// Se encarga de definir la lógica de negocio relacionada con los participantes, como el registro de un nuevo participante.

const ParticipanteModel = require("../models/participante.model.js");
const Mailer = require("../../config/mailer/Mailer");
const NotifyParticipanteRegister = require("../../config/mailer/notifyParticipanteRegister/notifyParticipanteRegister");


const ParticipanteService = {
    async registrarParticipante(participante, id_tutor, fullPath, id_sede) {

        // Obtener el id del tutor registrado
        participante.id_tutor = id_tutor;

        // Añadir la ruta del archivo de permiso del tutor al participante
        participante.permiso_tutor = fullPath;

        // Añadir el id de la sede de interés al participante
        participante.id_sede = id_sede;

        await ParticipanteModel.createParticipante(participante);

        // Enviar correo de confirmación
        const mailer = new Mailer(new NotifyParticipanteRegister());
        await mailer.sendEmail(participante.nombre, participante.correo);
    },
};

module.exports = ParticipanteService;