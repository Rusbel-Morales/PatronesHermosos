// sede.controller.js
// Se encarga de manejar la lógica de las peticiones HTTP relacionadas con las sedes en la API REST, utilizando los servicios de SedeService.

const CoordSedeService = require("../../services/coordSede.service.js");
const GrupoService = require("../../services/grupo.service.js");
const SedeService = require("../../services/sede/sede.service.js");

function validateData(coordSede, sede, file_pdf) {
	// Validar datos de la coordinadora de sede
	if (!coordSede.nombre || !coordSede.correo || !coordSede.telefono) {
		return "Faltan datos de la coordinadora de sede";
	}

	// Validar datos de la sede
	if (!sede.nombre_sede || !sede.fecha_inicio || !sede.num_grupos_sede) {
		return "Faltan datos de la sede";
	}

	// Validar si se subió el archivo de la convocatoria firmada
	if (!file_pdf) {
		return "No se subió el archivo";
	}

	return null;
}

const SedeController = {
	async registrarSede(req, res) {
		try {
			const { data } = req.body;
			const { coordSede, sede } = JSON.parse(data);

			const file_pdf = req.file;

			// Validaciones de los datos
			const error = validateData(coordSede, sede, file_pdf);
			if (error) {
				return res.status(400).json({ error });
			}

			// Registrar la coordinadora de sede, la sede y los grupos de la sede
			const { id_sede }  = await SedeService.registrarSede(sede, file_pdf);
			await CoordSedeService.registrarCoordinadoraSede(coordSede, id_sede);

			res.status(201).json({ message: "Sede, coordinadora de sede y grupos de la sede registradas con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	async obtenerSedes(_, res) {
		try {
			const sedes = await SedeService.obtenerSedes();
			res.status(200).json(sedes);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async obtenerTodaInfoSedes(_, res) {
		try {
			const sedes = await SedeService.obtenerTodaInfoSedes();
			res.status(200).json(sedes);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async obtenerDetallesUnaSede(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			// Obtener detalles de una sede específica
			const detallesUnaSede = await SedeService.obtenerDetallesUnaSede(id);
			res.status(200).json(detallesUnaSede);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async aceptarSede(req, res) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			const num_grupos_sede = await SedeService.aceptarSede(id);

			if (num_grupos_sede > 0) {
				await GrupoService.registrarGrupo(id, num_grupos_sede);
			}

			res.status(200).json({ message: "Sede aprobada con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async rechazarSede(req, res) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			await SedeService.rechazarSede(id);
			res.status(200).json({ message: "Sede rechazada con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	/**
	 * Descarga el archivo de convocatoria para una sede específica.
	 * @param {Object} req - El objeto de solicitud HTTP.
	 * @param {Object} res - El objeto de respuesta HTTP.
	 * @returns {Promise<void>} - Una promesa que resuelve cuando la operación se completa.
	 */
	
	async descargarConvocatoria(req, res) {
		try {
			const { id } = req.params;
			
			const convocatoria = await SedeService.descargarConvocatoria(id);
			if (!convocatoria) {
				return res.status(404).json({ error: "Sede no encontrada" });
			}
			res.setHeader("Content-Type", "application/pdf");
			res.send(convocatoria);
		} catch (error) {
			if (error.message === "Token de sesión requerido") {
				return res.status(401).json({ error: error.message });
			}
			if (error.message === "Acceso denegado") {
				return res.status(403).json({ error: error.message });
			}
			if (error.message === "Sede no encontrada") {
				return res.status(404).json({ error: error.message });
			}
			res.status(500).json({ error: "Error al descargar la convocatoria: " + error.message });
		}
	}
};

module.exports = SedeController;