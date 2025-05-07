// coordSede.service.test.js
// Descripción: Lógica de negocio para la gestión de coordinadoras de sede.

const CoordSedeModel = require("../models/coordSede.model.js");
const Mailer = require("../../config/mailer/Mailer");
const NotifySedeRegister = require("../../config/mailer/notifySedeRegister/notifySedeRegister");

const CoordSedeService = {
    async registrarCoordinadoraSede(coordSede, id_sede) {
        
        // Obtener el id de la sede registrada
        coordSede.id_sede = id_sede;
        
        await CoordSedeModel.createCoordSede(coordSede);

        const mailer = new Mailer(new NotifySedeRegister());
        await mailer.sendEmail({nombre: coordSede.nombre, correo: coordSede.correo});
    }
}

module.exports = CoordSedeService;