const MentoraService = require('../services/mentora.service.js');
const { validateDataMentora } = require('../utils/validateData.js');


const MentoraController = {
    async registarMentora(req, res) {
		try {
			const { mentora, id_sede} = req.body;

			// Validaciones de los datos
			const error = validateDataMentora(mentora, id_sede);
			if (error) {
				return res.status(400).json({ error });
			}

			// Insertar mentora a la base de datos
			await MentoraService.registrarMentora(mentora, id_sede);
			res.status(201).json({ message: "Mentora registrada con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = MentoraController;