// sede.service.js
// Descripción: Se encarga de manejar la lógica de negocio relacionada con las sedes en la base de datos, utilizando el modelo Sede.

const SedeModel = require("../../models/sede.model.js");
const { transformNameSede } = require("../../utils/processFile.js");
const ApproveSedeEmail = require("../../../config/mailer/approveSedeEmail/approveSedeEmail");
const Mailer = require("../../../config/mailer/Mailer");
const RejectSedeEmail = require("../../../config/mailer/rejectSedeEmail/rejectSedeEmail");

const SedeService = {
    async registrarSede(sede, file_pdf) {

        // Transformar el nombre de la sede a un formato adecuado para el archivo (quitar acentos, espacios y convertir a minúsculas)
        const nombreConvocatoriaFirmada = transformNameSede(sede.nombre_sede);

        // Insertar el archivo de la convocatoria firmada en el storage de supabase
        const { fullPath } = await SedeModel.enviarConvocatoria(nombreConvocatoriaFirmada, file_pdf);

        // Añadir la ruta del archivo de la convocatoria firmada a la sede
        sede.convocatoria_firmada = fullPath;

        // Registrar la sede en la base de datos
        return await SedeModel.createSede(sede);
    },
	async obtenerSedes() {
		return await SedeModel.obtenerSedes();
	},

	async obtenerTodaInfoSedes() {
		const result = await SedeModel.obtenerTodaInfoSedes();

		// Separar la hora de la fecha y aplanar el objeto
		const flattenObject = result.map(obj => ({
			id_sede: obj.id_sede,
			nombre_sede: obj.nombre_sede,
			estado: obj.estado,
			fecha_solicitud: obj.fecha_solicitud.split("T")[0],
			fecha_inicio: obj.fecha_inicio,
			nombre_coord_sede: obj.nombre_coord_sede,
			correo_coord_sede: obj.correo_coord_sede,
			total_participantes: obj.total_participantes,
			total_grupos: obj.total_grupos
		}));

		return flattenObject;
	},

	async aceptarSede(id_sede) {
		// Aceptar la sede en la base de datos
		const { num_grupos_sede } = await SedeModel.aceptarSede(id_sede);

		// Obtener nombre y correo de la coordinadora de la sede
		const { nombre, correo } = await SedeModel.getCoordSedeDataByIdSede(id_sede);

		// Enviar correo de aprobación
		const mailer = new Mailer(new ApproveSedeEmail());
		await mailer.sendEmail(nombre, correo);

		return num_grupos_sede;
	},

	async rechazarSede(id_sede) {
		await SedeModel.rechazarSede(id_sede);

		// Obtener nombre y correo de la coordinadora de la sede
		const { nombre, correo } = await SedeModel.getCoordSedeDataByIdSede(id_sede);

		// Enviar correo de aprobación
		const mailer = new Mailer(new RejectSedeEmail());
		await mailer.sendEmail(nombre, correo);
	},
	async obtenerTopSedes() {
		return await SedeModel.getTopSedes();
	},

	async obtenerSedesEstado() {
		return await SedeModel.getSedesEstado();
	},

	async obtenerDetallesUnaSede(id_sede) {
		const result = await SedeModel.getDetallesUnaSede(id_sede);

		// Separar la hora de la fecha y aplanar el objeto
		const modifiedResult = {
			...result,
			sede: {
				...result.sede,
				fecha_solicitud: result.sede.fecha_solicitud.split("T")[0]
			}
		};

		return modifiedResult;
	},

	async descargarConvocatoria(id) {
		// Obtener la ruta del archivo de convocatoria en base al ID
		const convocatoriaPath = await SedeModel.getConvocatoriaPathById(id);

		if (!convocatoriaPath) throw new Error("Sede no encontrada");

		// Obtener el nombre del archivo desde la ruta
		const fileName = convocatoriaPath.split("/").pop();

		const data = await SedeModel.descargarConvocatoria(fileName);

		const arrayBuffer = await data.arrayBuffer();
		return Buffer.from(arrayBuffer);
	},
	async obtenerSedesPendientes() {
		const result = await SedeModel.getSedesAndSedeCoordinator();

		// Separar la hora de la fecha y aplanar el objeto
		const flattenObject = result.map(obj => ({
			id_sede: obj.sede.id_sede,
			nombre_coord_sede: obj.nombre,
			nombre_sede: obj.sede.nombre_sede,
			fecha_solicitud: obj.sede.fecha_solicitud.split("T")[0],
		}));

		return flattenObject;
	},
	async obtenerNumeroSolicitudesSedes() {
		return await SedeModel.getNumeroSolicitudesSedes();
	}
};

module.exports = SedeService;