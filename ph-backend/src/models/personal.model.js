// personal.model.js
// Descripción: Modelo para la gestión de personal.

const supabase = require("../../config/database.js");

const PersonalModel = {

    /**
     * Insert a new personalAlumna into the database
     * @param {Object} personal - The personalAlumna object to be inserted
     * @param {string} personal.nombre - The name of the personal
     * @param {string} personal.correo - The email of the personal
     * @param {string} personal.universidad_origen  - The universidad_origen of the personal
     * @param {string} personal.carrera - The carrera of the personal
     * @param {string} personal.idioma_preferencia - The idioma_preferencia of the personal
     * @param {string} personal.nivel_preferencia - The nivel_preferencia of the personal
     * @param {string} personal.rol_preferencia - The rol_preferencia of the personal
     * @param {string} timestamp_formulario_enviado - The timestamp_formulario_enviado of the personal
     * @param {string} timestamp_resuelto - The timestamp_resuelto of the personal
     * @param {string} personal.estado - The estado of the personal
     * @param {string} personal.id_sede - The id_sede of the personal
     * @returns {Promise<Object>} The object data or an error object
     */
    async createPersonal(personal) {
        const { error } = await supabase
            .from("personal")
            .insert(personal)

        if (error) {
            throw new Error("Error al registrar al personal " + error.message);
        }
    },
    async getUsuariosEstadoRol(id_sede) {
		const { data, error } = await supabase
			.rpc("obt_usuarios_por_estado_y_rol", { p_id_sede: id_sede })
			.single();

		if (error) {
			throw new Error("Error al obtener los usuarios por estado y rol: " + error.message);
		}

		return data;
	},
	async getTotalPersonalRol(id_sede) {
		const { data, error } = await supabase
			.rpc("obt_cantidad_personal_rol", { p_id_sede: id_sede })
			.single();

		if (error) {
			throw new Error("Error al obtener el total de personal por rol: " + error.message);
		}

		return data;
	},
	async getPersonalPendiente(id_sede) {
		const { data, error } = await supabase
			.from("personal")
			.select(`
                id_personal, 
                nombre, 
                correo,
                universidad_origen,
                carrera,
                idioma_preferencia,
                nivel_preferencia,
                rol_preferencia, 
                fecha_formulario:timestamp_formulario_enviado, 
                sede!inner(nombre_sede)
            `)
			.match({ id_sede, estado: "pendiente" })
            .order("timestamp_formulario_enviado", { ascending: true })
            .limit(5)

        if (error) {
            throw new Error("Error al obtener el personal pendiente: " + error.message);
        }

        return data;
	},
	async listarPersonal(id_sede) {
		const { data, error } = await supabase
			.from("personal")
			.select("id_personal, nombre, correo, rol_preferencia, idioma_preferencia, nivel_preferencia, estado, universidad_origen, carrera, fecha_formulario:timestamp_formulario_enviado")
			.eq("id_sede", id_sede);

		if (error) {
			throw new Error("Error al listar el personal: " + error.message);
		}

		return data;
	},
    async getPersonalBySede(id_sede) {
        const { data, error } = await supabase
            .from("personal")
            .select("id_personal, nombre, idioma_preferencia, nivel_preferencia, rol_preferencia")
            .match({ id_sede, estado: "aceptado" }); 

        if (error) {
            throw new Error("Error al obtener el personal por sede: " + error.message);
        }

        return data;
    },
    async getPersonalSinGrupo(id_sede) {
        const { data, error } = await supabase
            .from("personal")
            .select("id_personal, nombre, rol_preferencia, idioma:idioma_preferencia ,nivel:nivel_preferencia")
            .match({ id_sede, estado: "aceptado" })
            .filter("id_grupo", "is", null);

        if (error) {
            throw new Error(`Error al obtener el personal ${conGrupo ? 'con' : 'sin'} grupo de la sede ${id_sede}: ${error.message}`);
        }

        return data;
    },
    async updatePersonalReference(id_personal, id_grupo) {
		const { error } = await supabase
			.from("personal")
			.update({id_grupo})
			.eq("id_personal", id_personal);
		
		if (error) {
			throw new Error(`Error al actualizar la referencia del personal ${id_personal}: ${error.message}`);
		}
	}
}

module.exports = PersonalModel;