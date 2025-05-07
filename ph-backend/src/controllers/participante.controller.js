// participante.controller.js
// Se encarga de definir la lógica de las rutas relacionadas con los participantes en la API REST, utilizando el servicio ParticipanteService.

const ParticipanteService = require("../services/participante.service.js");
const TutorService = require("../services/tutor.service.js");
const { validateParticipanteTutorData } = require("../utils/validateData.js");

const ParticipanteController = {
	async registrarParticipante(req, res) {
		try {
			const { data } = req.body;
			const { participante, tutor, sede } = JSON.parse(data);
			const file_pdf = req.file;

			// Validaciones de los datos
			const error = validateParticipanteTutorData(participante, tutor, sede, file_pdf);
			if (error) {
				return res.status(400).json({ error });
			}

			// Insertar tutor en la base de datos
			const [id_tutor, fullPath] = await TutorService.registrarTutor(tutor, sede.nombre_sede, file_pdf);

			// Insertar participante en la base de datos
			await ParticipanteService.registrarParticipante(participante, id_tutor, fullPath, sede.id_sede);

			res.status(201).json({ message: "Participante y tutor registrado con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async listarParticipantes(req, res) {
		try {
			const { id_sede } = req.query;

			if (!id_sede) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			const participantes = await ParticipanteService.listarParticipantes(id_sede);

			res.status(200).json(participantes);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
};

module.exports = ParticipanteController;