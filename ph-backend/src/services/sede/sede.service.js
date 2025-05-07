// sede.service.js
// Descripción: Se encarga de manejar la lógica de negocio relacionada con las sedes en la base de datos, utilizando el modelo Sede.

const SedeModel = require("../../models/sede.model.js");
const bcrypt = require("bcrypt");
const {transformNameSede} = require("../../utils/processFile.js");
const ApproveSedeEmail = require("../../../config/mailer/approveSedeEmail/approveSedeEmail");
const Mailer = require("../../../config/mailer/Mailer");
const RejectSedeEmail = require("../../../config/mailer/rejectSedeEmail/rejectSedeEmail");
const generatePassword = require("../../utils/generatePassword.js");
const AceptarPostulacionEmail = require("../../../config/mailer/aceptarPostulacionEmail/aceptarPostulacionEmail");
const RechazarPostulacionEmail = require("../../../config/mailer/rechazarPostulacionEmail/rechazarPostulacionEmail");

const SedeService = {
	async registrarSede(sede, file_pdf) {

		// Transformar el nombre de la sede a un formato adecuado para el archivo (quitar acentos, espacios y convertir a minúsculas)
		const nombreConvocatoriaFirmada = transformNameSede(sede.nombre_sede);

		// Insertar el archivo de la convocatoria firmada en el storage de supabase
		const {fullPath} = await SedeModel.enviarConvocatoria(nombreConvocatoriaFirmada, file_pdf);

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
		return result.map(obj => ({
			...obj,
			fecha_solicitud: obj.fecha_solicitud.split("T")[0],
		}));
	},

	async aceptarSede(id_sede) {
		const saltRounds = 11; // Número de rondas para el hash

		// Obtener nombre y correo de la coordinadora de la sede
		const {nombre, correo} = await SedeModel.getCoordSedeDataByIdSede(id_sede);

		// Establecer un password aleatorio para la coordinadora de sede
		const password = await generatePassword(nombre);
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Insertar la contraseña en la base de datos
		await SedeModel.insertPassword(id_sede, hashedPassword);

		// Aceptar la sede en la base de datos
		await SedeModel.aceptarSede(id_sede);

		// TODO: Enviar correo a la coordinadora de sede con la contraseña generada
		// Enviar correo de aprobación
		const mailer = new Mailer(new ApproveSedeEmail());
		await mailer.sendEmail({nombre, correo, password});
	},
	async rechazarSede(id_sede) {
		await SedeModel.rechazarSede(id_sede);

		// Obtener nombre y correo de la coordinadora de la sede
		const {nombre, correo} = await SedeModel.getCoordSedeDataByIdSede(id_sede);

		// Enviar correo de aprobación
		const mailer = new Mailer(new RejectSedeEmail());
		await mailer.sendEmail({nombre, correo});
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
		return {
			...result,
			sede: {
				...result.sede,
				fecha_solicitud: result.sede.fecha_solicitud.split("T")[0]
			}
		};
	},
	async obtenerSedesPendientes() {
		const result = await SedeModel.getSedesAndSedeCoordinator();

		// Separar la hora de la fecha y aplanar el objeto
		return result.map(obj => ({
			id_sede: obj.sede.id_sede,
			nombre_coord_sede: obj.nombre,
			correo_coord_sede: obj.correo,
			nombre_sede: obj.sede.nombre_sede,
			estado: obj.sede.estado,
			fecha_solicitud: obj.sede.fecha_solicitud.split("T")[0],
			fecha_inicio: obj.sede.fecha_inicio
		}));
	},
	async obtenerNumeroSolicitudesSedes() {
		return await SedeModel.getNumeroSolicitudesSedes();
	},
	async aceptarPostulacion(id_aplicante, rolTabla) {
		return await SedeModel.actualizarEstadoPostulacion(id_aplicante, rolTabla, "aceptado");
	},
	async rechazarPostulacion(id_aplicante, rolTabla) {
		return await SedeModel.actualizarEstadoPostulacion(id_aplicante, rolTabla, "rechazado");
	},
	async gestionarPostulacion(accion, {id_aplicante, rol, nombre, correo}) {
		// Definir las tablas asociadas a los roles
		const TABLES = {
			participante: "participante",
			personal: "personal"
		};

		// Determinar la tabla correspondiente al rol, por defecto se usa "personal"
		const rolTabla = TABLES[rol] || TABLES.personal;

		// Definir las acciones permitidas y sus métodos asociados
		const ACTIONS = {
			aceptar: SedeService.aceptarPostulacion,
			rechazar: SedeService.rechazarPostulacion
		};

		// Validar que la acción proporcionada sea válida
		if (!ACTIONS[accion]) {
			throw new Error(`Acción no válida: ${accion}`);
		}

		// Ejecutar la acción correspondiente (aceptar o rechazar la postulación)
		await ACTIONS[accion](id_aplicante, rolTabla);

		// Definir las plantillas de correo asociadas a cada acción
		const EMAIL_TEMPLATES = {
			aceptar: AceptarPostulacionEmail,
			rechazar: RechazarPostulacionEmail
		};

		// Crear una instancia del mailer con la plantilla correspondiente
		const emailTemplate = EMAIL_TEMPLATES[accion];
		const mailer = new Mailer(new emailTemplate());

		// Enviar el correo al aplicante notificando la acción realizada
		await mailer.sendEmail({nombre, correo, rol});
	},
};

module.exports = SedeService;