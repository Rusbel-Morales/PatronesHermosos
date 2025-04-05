// participanteValidation.js
// Valida los campos obligatorios del formulario antes de enviarlo.

/**
 * Objeto que representa los errores de validación.
 * Cada clave representa el campo con error y el valor es el mensaje correspondiente.
 * @typedef {Object.<string, string>} ValidationErrors
 */

/**
 * Valida los campos obligatorios del formulario de participante.
 *
 * @param {Object} formData - Datos del formulario del participante.
 * @param {Object} formData.participante - Datos del participante.
 * @param {string} formData.participante.nombre - Nombre del participante.
 * @param {string} formData.participante.correo - Correo electrónico del participante.
 * @param {string} formData.participante.escolaridad - Escolaridad del participante.
 * @param {File|null} formData.participante.permiso_tutor - Archivo PDF con los permisos firmados.
 * @param {Object} formData.tutor - Datos del tutor.
 * @param {string} formData.tutor.nombre_tutor - Nombre del tutor.
 * @param {string} formData.tutor.correo_tutor - Correo electrónico del tutor.
 * @param {string} formData.tutor.telefono_tutor - Teléfono del tutor.
 *
 * @returns {ValidationErrors} Objeto con los errores encontrados.
 */
export const validateParticipanteForm = (formData) => {
	const errors = {};
	const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/;
	const regex2 = /\D/;
	const regex3 = /@/;

	// Nombre
	if (!formData.participante.nombre) {
		errors.nombre = "El nombre es obligatorio";
	} else if (!regex.test(formData.participante.nombre)) {
		errors.nombre = "El nombre no puede contener signos o números";
	}

	// Correo
	if (!formData.participante.correo) {
		errors.correo = "El correo es obligatorio";
	} else if (!regex3.test(formData.participante.correo)) {
		errors.correo = "El correo debe contener @";
	}

	// Escolaridad
	if (!formData.participante.escolaridad) {
		errors.escolaridad = "Debe seleccionar su escolaridad";
	}

	// Nombre del Tutor
	if (!formData.tutor.nombre_tutor) {
		errors.tutorNombre = "El nombre del tutor es obligatorio";
	} else if (!regex.test(formData.tutor.nombre_tutor)) {
		errors.tutorNombre = "El nombre del tutor no puede contener signos o números";
	}

	// Correo del Tutor
	if (!formData.tutor.correo_tutor) {
		errors.tutorCorreo = "El correo del tutor es obligatorio";
	} else if (!regex3.test(formData.tutor.correo_tutor)) {
		errors.tutorCorreo = "El correo del tutor debe contener @";
	}

	// Teléfono del Tutor
	if (!formData.tutor.telefono_tutor) {
		errors.telefono = "El teléfono es obligatorio";
	} else if (regex2.test(formData.tutor.telefono_tutor)) {
		errors.telefono = "El teléfono solo puede contener números";
	} else if (formData.tutor.telefono_tutor.toString().length < 10) {
		errors.telefono = "Introduzca un número válido";
	}

	// Permisos PDF
	if (!formData.participante.permiso_tutor) {
		errors.permisosPDF = "Debe adjuntar los permisos firmados";
	}

	return errors;
};
