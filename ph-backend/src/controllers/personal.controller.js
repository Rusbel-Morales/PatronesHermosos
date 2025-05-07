// personal.controller.js
// Se encarga de manejar la lógica de las peticiones HTTP relacionadas con el personal en la API REST, utilizando los servicios de PersonalService.
const PersonalService = require("../services/personal.service");
const { validateDataPersonal } = require("../utils/validateData.js");

const PersonalController = {
    async registrarPersonal(req, res) {
        try {
            const { personal, sede } = req.body;

			// Validaciones de los datos
			const error = validateDataPersonal(personal, sede);
			if (error) {
				return res.status(400).json({ error });
			}

			// Insertar personal a la base de datos
			await PersonalService.registrarPersonal(personal, sede.id_sede);

			res.status(201).json({ message: "Personal registrada con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	},
	async obtenerUsuariosEstadoRol(req, res) {
		try {
			const { id_sede } = req.query;
			
			if (!id_sede) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			const usuariosEstadoRol = await PersonalService.obtenerUsuariosEstadoRol(id_sede);
			res.status(200).json(usuariosEstadoRol);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	async obtenerTotalPersonalRol(req, res) {
		try {
			const { id_sede } = req.query;
			
			if (!id_sede) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			const totalPersonalRol = await PersonalService.obtenerTotalPersonalRol(id_sede);
			res.status(200).json(totalPersonalRol);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	async listarPersonal(req, res) {
			try {
				const { id_sede } = req.query;

				if (!id_sede) {
					return res.status(400).json({ error: "Id de sede no proporcionado" });
				}

				const personal = await PersonalService.listarPersonal(id_sede);
				res.status(200).json(personal);
			} catch (error) {
				res.status(500).json({ error: error.message });
			}
	}
};

module.exports = PersonalController;