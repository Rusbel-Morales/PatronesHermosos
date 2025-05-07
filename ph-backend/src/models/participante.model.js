const supabase = require('../../config/database.js');

const ParticipanteModel = {

	/**
	 * Insert a new participante into the database
	 * @param {Object} participante - The participante object to be inserted
	 * @param {string} participante.nombre - The name of the participante
	 * @param {string} participante.correo - The email of the participante
	 * @param {number} participante.edad - The age of the participante
	 * @param {string} participante.escolaridad - The escolaridad of the participante
	 * @param {string} participante.idioma_preferencia - The idioma_preferencia of the participante
	 * @param {string} participante.grado - The grado of the participante
	 * @param {string} participante.permiso_tutor - The permiso_tutor of the participante
	 * @param {number} participante.id_tutor - The id_tutor of the participante
	 * @param {string} participante.id_sede - The id_sede of the participante
	 * @returns {Promise<Object>} The object data or an error object
	 */

	async createParticipante(participante) {
		const { error } = await supabase
			.from("participante")
			.insert(participante);

		if (error) {
			throw new Error("Error al registrar el participante: " + error.message);
		}
	},
	async getParticipantesBySede(id_sede) {
		const { data, error } = await supabase
			.from("participante")
			.select("id_participante, nombre, correo, edad, escolaridad, idioma_preferencia, grado, estado")
			.eq("id_sede", id_sede);

		if (error) {
			throw new Error("Error al obtener los participantes: " + error.message);
		}

		return data;
	},
	async getParticipantesPorEstado(id_sede) {
		const { data, error } = await supabase
			.rpc("obt_participantes_por_estado", { p_id_sede: id_sede })
			.single();

		if (error) {
			throw new Error("Error al obtener los participantes por estado: " + error.message);
		}

		return data;
	},
	async getNumSolicitudesParticipantesPersonal(id_sede) {
		const { data, error } = await supabase
			.rpc("obt_solicitudes_participantes_personal", { p_id_sede: id_sede })
			.single();
		
		if (error) {
			throw new Error("Error al obtener el número de solicitudes de participantes: " + error.message);
		}

		return data
	},
	async getParticipantesPendientes(id_sede) {
		const { data, error } = await supabase
			.from("participante")
			.select(`
				id_participante, 
				nombre,
				correo,
				edad,
				escolaridad,
				grado,
				fecha_formulario:timestamp_formulario_enviado,
				tutor!inner(nombre),
				sede!inner(nombre_sede)
			`)
			.match({ id_sede, estado: "pendiente" })
			.order("timestamp_formulario_enviado", { ascending: true })
			.limit(5);

		if (error) {
			throw new Error("Error al obtener los participantes pendientes: " + error.message);
		}

		return data;
	},
	async getParticipantesPorSede(id_sede) {
		const { data, error } = await supabase
			.from("participante")
			.select("id_participante, nombre, escolaridad, idioma_preferencia")
			.match({id_sede, estado: "aceptado"});

		if (error) {
			throw new Error("Error al obtener los participantes por sede: " + error.message);
		}

		return data;
	},
	async getParticipantesSinGrupo(id_sede) {
		const { data, error } = await supabase
			.from("participante")
			.select("id_participante, nombre, idioma:idioma_preferencia, escolaridad")
			.match({ id_sede, estado: "aceptado" })
			.filter("id_grupo", "is", null)

		if (error) {
			throw new Error(`Error al obtener los participantes ${conGrupo ? 'con' : 'sin'} grupo de la sede ${id_sede}: ${error.message}`);
		}

		return data;
	},
	async updateParticipanteReference(id_participante, id_grupo) {
		const { error } = await supabase
			.from("participante")
			.update({ id_grupo })
			.eq("id_participante", id_participante);

		if (error) {
			throw new Error(`Error al actualizar la referencia del participante ${id_participante}: ${error.message}`);
		}
	}
}

module.exports = ParticipanteModel;