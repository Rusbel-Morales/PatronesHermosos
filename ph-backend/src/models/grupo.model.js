const supabase = require('../../config/database.js');

const GrupoModel = {

	/**
	 * Insert a new grupo into the database
	 * @param {Object} grupo - The grupo object to be inserted
	 * @param {string} grupo.idioma - 'espanol' or 'ingles'
	 * @param {string} grupo.nivel - 'basico' or 'avanzado'
	 * @param {number} grupo.cupo_max - Must be > 0
	 * @param {number} grupo.id_sede - The ID of the sede
	 * @returns {Promise<Object>} The inserted grupo data
	 */
	async createGrupo(grupos) {
		const { error } = await supabase
			.from("grupo")
			.insert(grupos)

		if (error) {
			throw new Error("Error al registrar el grupo: " + error.message);
		}
	},
	async getGruposSedes(id_sede) {
		const { data, error } = await supabase
			.rpc("obt_datos_grupo_sede", { p_id_sede: id_sede });

		if (error) {
			throw new Error(`Error al obtener los grupos de la sede ${id_sede}: ${error.message}`);
		}

		return data;
	},
	async getGruposCreados(id_sede) {
		const { data, error } = await supabase
			.rpc("obt_grupos_creados", { p_id_sede: id_sede });
			
		if (error) {
			throw new Error(`Error al obtener los grupos creados de la sede ${id_sede}: ${error.message}`);
		}

		return data
	},
	async updateGrupo(id_grupo, datosGrupo) {
		const { error } = await supabase
			.from("grupo")
			.update(datosGrupo)
			.eq("id_grupo", id_grupo)

		if (error) {
			throw new Error(`Error al actualizar el grupo ${id_grupo}: ${error.message}`);
		}
	},
	async deleteGrupo(id_grupo) {
		const { data, error } = await supabase
			.from("grupo")
			.delete()
			.eq("id_grupo", id_grupo);

		if (error) {
			throw new Error(`Error al eliminar el grupo ${id_grupo}: ${error.message}`);
		}

		return data;
	},
	async updateMentoraReferenceInGroup(id_mentora, id_grupo) {
		const { error } = await supabase
			.from("grupo")
			.update({ id_mentora })
			.eq("id_grupo", id_grupo);

		if (error) {
			throw new Error(`Error al actualizar la mentora del grupo ${id_grupo}: ${error.message}`);
		}
	},
	async updatePersonalReferenceOutGroup(id_mentora) {
		const { error } = await supabase
			.from("grupo")
			.update({ id_mentora: null })
			.eq("id_mentora", id_mentora);

		if (error) {
			throw new Error(`Error al actualizar el personal del grupo ${id_grupo}: ${error.message}`);
		}
	},
}

module.exports = GrupoModel;