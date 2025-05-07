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
		await mailer.sendEmail({nombre: participante.nombre, correo: participante.correo});
	},

	async listarParticipantes(id_sede) {
		// Obtener y retornar la lista de participantes de la sede
		return await ParticipanteModel.getParticipantesBySede(id_sede);
	}, 
	async participantesEstado(id_sede) {
		return await ParticipanteModel.getParticipantesPorEstado(id_sede);
	},
	async numSolicitudesParticipantesPersonal(id_sede) {
		return await ParticipanteModel.getNumSolicitudesParticipantesPersonal(id_sede);
	},
	async obtenerParticipantesPendientes(id_sede) {
		const participantes = await ParticipanteModel.getParticipantesPendientes(id_sede);

		// Separa la hora de la fecha
		return participantes.map(part => ({
			...part,
			fecha_formulario: part.fecha_formulario.split("T")[0],
		}));
	},
	async updateParticipanteReference(participante, id_grupo = null) {
		if (participante.length === 0) return;

		participante.forEach(async id_participante => {
			await ParticipanteModel.updateParticipanteReference(id_participante, id_grupo);
		})
	}
};

module.exports = ParticipanteService;