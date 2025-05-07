// sede.model.js
// Se encarga de definir la lógica de negocio relacionada con las sedes, como el registro de una nueva sede.

const supabase = require('../../config/database');

const SedeModel = {

	/**
	 * Insert a new sede into the database
	 * @param {Object} sede - The sede object to be inserted
	 * @param {string} sede.nombre_sede - The name of the sede
	 * @param {string} sede.convocatoria_firmada - The signed convocatoria of the sede
	 * @param {Date} sede.fecha_inicio - The start date of the bootcamp
	 * @param {number} sede.num_grupos_sede - The number of groups in the sede
	 * @returns {Promise<Object>} The object data or an error object
	 */

	async createSede(sede) {
		const {data, error} = await supabase
			.from("sede")
			.insert(sede)
			.select(`id_sede`)
			.single()

		if (error) {
			throw new Error("Error al registrar la sede: " + error.message);
		}

		return data;
	},
	async enviarConvocatoria(nombre_sede_transformado, file_pdf) {
		const {data, error} = await supabase
			.storage
			.from("convocatorias-sedes")
			.upload(`${nombre_sede_transformado}`, file_pdf.buffer, {
				// Enviar un archivo pdf
				contentType: "application/pdf"
			})

		if (error) {
			throw new Error("Error al subir la convocatoria firmada de la sede: " + error.message);
		}

		return data;
	},
	async obtenerSedes() {
		const {data, error} = await supabase
			.from("sede")
			.select("id_sede, nombre_sede")
			.eq("estado", "aceptado")

		if (error) {
			throw new Error("Error al obtener las sedes: " + error.message);
		}

		return data;
	},
	async obtenerTodaInfoSedes() {
		const {data, error} = await supabase
			.rpc("obt_toda_info_sedes")

		if (error) {
			throw new Error("Error al obtener la información de las sedes: " + error.message);
		}

		return data;
	},
	async aceptarSede(id_sede) {
		const {error} = await supabase
			.from("sede")
			.update({estado: "aceptado"})
			.eq("id_sede", id_sede)

		if (error) {
			throw new Error("Error al aprobar la sede: " + error.message);
		}
	},
	async rechazarSede(id_sede) {
		const {data, error} = await supabase
			.from("sede")
			.update({estado: "rechazado"})
			.eq("id_sede", id_sede);

		if (error) {
			throw new Error("Error al rechazar la sede: " + error.message);
		}

		return data;
	},
	async getTopSedes() {
		const {data, error} = await supabase
			.rpc("obt_numero_participantes_sedes")

		if (error) {
			throw new Error("Error al obtener el total de los participantes por sede: " + error.message);
		}

		return data;
	},
	async getSedesEstado() {
		const {data, error} = await supabase
			.rpc("obt_sedes_estado")

		if (error) {
			throw new Error("Error al obtener las sedes y su estado: " + error.message);
		}

		return data;
	},
	async getDetallesUnaSede(id_sede) {
		const {data, error} = await supabase
			.from("coord_sede")
			.select("nombre, correo, sede!inner(nombre_sede, estado, fecha_solicitud, fecha_inicio)")
			.eq("sede.id_sede", id_sede)
			.single();

		if (error) {
			throw new Error("Error al obtener los detalles de las sedes: " + error.message);
		}

		return data;
	},
	async getCoordSedeDataByIdSede(id_sede) {
		const {data, error} = await supabase
			.from("coord_sede")
			.select("nombre, correo")
			.eq("id_sede", id_sede)
			.single();

		// Si no se encuentra la sede, se lanza un error
		if (error) {
			throw new Error("Error al obtener los datos de la coordinadora de la sede: " + error.message);
		}

		return data;
	},
	async getSedesAndSedeCoordinator() {
		const {data, error} = await supabase
			.from("coord_sede")
			.select("nombre, correo, sede!inner(id_sede, nombre_sede, estado, fecha_solicitud, fecha_inicio)") // !inner() aplica un filtro a la relación
			.eq("sede.estado", "pendiente");

		if (error) {
			throw new Error("Error al relacionar las sedes y las coordinadoras de sedes: " + error.message);
		}

		return data;
	},
	async getNumeroSolicitudesSedes() {
		const {data, error} = await supabase
			.rpc("obt_numero_solicitud_sedes")
			.single();

		if (error) {
			throw new Error("Error al obtener el número de solicitudes de sedes: " + error.message);
		}

		return data.total_sedes;
	},
	async insertPassword(id_sede, password) {
		const {error} = await supabase
			.from("coord_sede")
			.update({password})
			.eq("id_sede", id_sede);

		if (error) {
			throw new Error("Error al insertar la contraseña: " + error.message);
		}
	},
	async getDataSede(id_sede) {
		const {data, error} = await supabase
			.from("sede")
			.select("nombre_sede, fecha_inicio ")
			.eq("id_sede", id_sede)
			.single();

		if (error) {
			throw new Error("Error al obtener el nombre de la sede: " + error.message);
		}

		return data;
	},
	async actualizarEstadoPostulacion(id_aplicante, rolTabla, nuevoEstado) {
		const {data, error} = await supabase
			.from(rolTabla)
			.update({estado: nuevoEstado, timestamp_resuelto: new Date()})
			.eq(`id_${rolTabla}`, id_aplicante)
			.select(`id_${rolTabla}`)
			.single();

		if (error) {
			throw new Error(`Error al actualizar ${rolTabla}: ${error.message}`);
		}

		return data;
	},
}

module.exports = SedeModel;