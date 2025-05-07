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
        await mailer.sendEmail({nombre: personal.nombre, correo: personal.correo});
    },
    async obtenerUsuariosEstadoRol(id_sede) {
		return await PersonalModel.getUsuariosEstadoRol(id_sede);
	},
	async obtenerTotalPersonalRol(id_sede) {
		return await PersonalModel.getTotalPersonalRol(id_sede);
	},
	async listarPersonal(id_sede) {
		const personal = await PersonalModel.listarPersonal(id_sede);

		return personal.map(p => ({
			...p,
			fecha_formulario: p.fecha_formulario.split("T")[0],
		}));
	},
    async obtenerPersonalPendiente(id_sede) {
        const personal = await PersonalModel.getPersonalPendiente(id_sede);

        return personal.map(p => ({
            ...p,
            fecha_formulario: p.fecha_formulario.split("T")[0]
        }));
    },
    async updatePersonalReference(personal, id_grupo = null) {
        if (personal.length === 0) return;
        
		personal.forEach(async id_personal => {
			await PersonalModel.updatePersonalReference(id_personal, id_grupo);
		})
	}
}

module.exports = PersonalService;