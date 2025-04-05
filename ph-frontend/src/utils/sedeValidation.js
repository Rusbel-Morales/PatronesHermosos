/**
 * Objeto que representa los errores de validación.
 * Cada clave representa el campo con error y el valor es el mensaje correspondiente.
 * @typedef {Object.<string, string>} ValidationErrors
 */

/**
 * Valida los campos obligatorios del formulario de sede.
 *
 * @param {Object} formData - Datos del formulario de la sede.
 * @param {string} formData.nombreCoordinadora - Nombre de la coordinadora.
 * @param {string} formData.nombreSede - Nombre de la sede.
 * @param {string} formData.correoCoordinadora - Correo electrónico de la coordinadora.
 * @param {string} formData.telefonoCoordinadora - Teléfono de la coordinadora.
 * @param {string} formData.fechaInicio - Fecha de inicio del evento.
 * @param {File|null} formData.convocatoriaPDF - Archivo PDF con la convocatoria firmada.
 *
 * @returns {ValidationErrors} Objeto con los errores encontrados.
 */
export const validateSedeForm = (formData) => {
	const errors = {};

	if (!formData.nombreCoordinadora) {
		errors.nombreCoordinadora = "El nombre es obligatorio";
	}

	if (!formData.nombreSede) {
		errors.nombreSede = "El nombre de la sede es obligatorio";
	}

	if (!formData.correoCoordinadora) {
		errors.correoCoordinadora = "El correo es obligatorio";
	}

	if (!formData.telefonoCoordinadora) {
		errors.telefonoCoordinadora = "El teléfono es obligatorio";
	}

	if (!formData.fechaInicio) {
		errors.fechaInicio = "La fecha de inicio es obligatoria";
	}

	if (!formData.convocatoriaPDF) {
		errors.convocatoriaPDF = "Debe adjuntar la convocatoria firmada";
	}

	return errors;
};