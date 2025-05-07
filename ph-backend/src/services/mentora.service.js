const MentoraModel = require('../models/mentora.model.js');
const NotifyMentoraRegister = require("../../config/mailer/notifyMentoraRegister/notifiyMentoraRegister");
const Mailer = require("../../config/mailer/Mailer");

const MentoraService = {
    async registrarMentora(mentora, id_sede) {
        // Añadir el id de la sede de participación a la mentora
        mentora.id_sede = id_sede;

        // Insertar mentora a la base de datos
        await MentoraModel.createMentora(mentora);

        // Enviar correo de confirmación a la mentora
        const mailer = new Mailer(new NotifyMentoraRegister());
        await mailer.sendEmail({nombre: mentora.nombre, correo: mentora.correo});
    }
}

module.exports = MentoraService;