// personal.controller.js
// Se encarga de manejar la lógica de las peticiones HTTP relacionadas con el personal en la API REST, utilizando los servicios de PersonalService.

const PersonalService = require("../services/personal.service");

function validateData(personal, sede) {

	// Validar datos del personal
	if (!personal.nombre || !personal.correo || !personal.universidad_origen || !personal.carrera || !personal.idioma_preferencia || !personal.nivel_preferencia || !personal.rol_preferencia) {
		return "Faltan datos del personal";
	}

	// Validar el id de la sede de participación
	if (!sede.id_sede) {
		return "Falta el id de la sede";
	}

	return null;
}

const PersonalController = {
    async registrarPersonal(req, res) {
        try {
            const { personal, sede } = req.body;

			// Validaciones de los datos
			const error = validateData(personal, sede);
			if (error) {
				return res.status(400).json({ error });
			}

			// Insertar personal a la base de datos
			await PersonalService.registrarPersonal(personal, sede.id_sede);

			res.status(201).json({ message: "Personal registrada con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
};

module.exports = PersonalController;