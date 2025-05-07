// sede.controller.js
// Se encarga de manejar la lógica de las peticiones HTTP relacionadas con las sedes en la API REST, utilizando los servicios de SedeService.

const CoordSedeService = require("../../services/coordSede.service.js");
const GrupoService = require("../../services/grupo.service.js");
const SedeService = require("../../services/sede/sede.service.js");
const { validateSedeData, validatePostulacionData } = require("../../utils/validateData.js");

const SedeController = {
	async registrarSede(req, res) {
		try {
			const {data} = req.body;
			const {coordSede, sede} = JSON.parse(data);

			const file_pdf = req.file;

			// Validaciones de los datos
			const error = validateSedeData(coordSede, sede, file_pdf);
			if (error) {
				return res.status(400).json({error});
			}

			// Registrar la coordinadora de sede, la sede y los grupos de la sede
			const {id_sede} = await SedeService.registrarSede(sede, file_pdf);
			await CoordSedeService.registrarCoordinadoraSede(coordSede, id_sede);

			res.status(201).json({message: "Sede, coordinadora de sede y grupos de la sede registradas con éxito"});
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},
	async obtenerSedes(_, res) {
		try {
			const sedes = await SedeService.obtenerSedes();
			res.status(200).json(sedes);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},
	async obtenerTodaInfoSedes(_, res) {
		try {
			const sedes = await SedeService.obtenerTodaInfoSedes();
			res.status(200).json(sedes);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	async obtenerDetallesUnaSede(req, res) {
		try {
			const {id} = req.params;
			if (!id) {
				return res.status(400).json({error: "Id de sede no proporcionado"});
			}

			// Obtener detalles de una sede específica
			const detallesUnaSede = await SedeService.obtenerDetallesUnaSede(id);
			res.status(200).json(detallesUnaSede);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	async aceptarSede(req, res) {
		try {
			const {id} = req.params;

			if (!id) {
				return res.status(400).json({error: "Id de sede no proporcionado"});
			}

			await SedeService.aceptarSede(id);

			res.status(200).json({message: "Sede aprobada con éxito"});
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	async rechazarSede(req, res) {
		try {
			const {id} = req.params;

			if (!id) {
				return res.status(400).json({error: "Id de sede no proporcionado"});
			}

			await SedeService.rechazarSede(id);
			res.status(200).json({message: "Sede rechazada con éxito"});
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},
	async gestionarPostulacion(req, res, accion) {
		try {
			const {id_aplicante} = req.params;
			const {rol, nombre, correo} = req.body;

			const error = validatePostulacionData(id_aplicante, rol, nombre, correo);
			if (error) {
				return res.status(400).json({error});
			}

			await SedeService.gestionarPostulacion(accion, {
				id_aplicante,
				rol,
				nombre,
				correo
			});

			const message = accion === "aceptar"
				? "Postulación aceptada con éxito"
				: "Postulación rechazada con éxito";

			res.status(200).json({message});
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},
	aceptarPostulacion: (req, res) => {
		SedeController.gestionarPostulacion(req, res, "aceptar");
	},
	rechazarPostulacion: (req, res) => {
		SedeController.gestionarPostulacion(req, res, "rechazar");
	},
};

module.exports = SedeController;