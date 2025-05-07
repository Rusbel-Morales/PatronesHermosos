// validatePostulacionData.js

// Valida los datos de la postulacion
const validatePostulacionData = (id_aplicante, rol, nombre, correo) => {
	if (!id_aplicante) return "Id de aplicante faltante";
	if (!rol) return "Rol faltante";
	if (!nombre) return "Nombre faltante";
	if (!correo) return "Correo faltante";
	return null;
};

// Validar los datos de la coordinadora de sede y la sede
const validateSedeData = (coordSede, sede, file_pdf) => {

	// Validar datos de la coordinadora de sede
	if (!coordSede.nombre || !coordSede.correo || !coordSede.telefono)
		return "Faltan datos de la coordinadora de sede";

	// Validar datos de la sede
	if (!sede.nombre_sede || !sede.fecha_inicio || !sede.num_grupos_sede)
		return "Faltan datos de la sede";

	// Validar si se subió el archivo de la convocatoria firmada
	if (!file_pdf)
		return "No se subió el archivo";

	return null;
};

// Valida los datos de inicio de sesión de la coordinadora general
const validateDataLogin = (username, password) => {

    // Validar datos de la coordinadora general
    if (!username || !password) {
        return "Faltan datos de la coordinadora general";
    }

    return null;
};

// Valida los datos de cierre de sesión de la coordinadora general
const validateDataLogout = (username, rol, tokenTable) => {

    // Validar datos de la coordinadora general
    if (!username || !rol || !tokenTable) {
        return "Faltan datos del token de la coordinadora general";
    }

    return null;
};

// Valida los datos de la mentora
const validateDataMentora = (mentora, id_sede) => {
	
	// Validar datos de la mentora
	if (!mentora.nombre || !mentora.correo) {
		return "Faltan datos de la mentora";
	}

	// Validar el id de la sede de participación
	if (!id_sede) {
		return "Id de sede no proporcionado";
	}

	return null;
};

// Valida los datos de un participante y un tutor
const validateParticipanteTutorData = (participante, tutor, sede, file_pdf) => {

	// Validar datos del participante
	if (!participante.nombre || !participante.correo || !participante.edad || !participante.escolaridad || !participante.grado) {
		return "Faltan datos del participante";
	}

	// Validar datos del tutor
	if (!tutor.nombre || !tutor.correo || !tutor.telefono) {
		return "Faltan datos del tutor";
	}

	// Validar el id de la sede de interés
	if (!sede.id_sede || !sede.nombre_sede) {
		return "Falta el nombre de la sede";
	}

	// Validar si se subió el archivo de permiso del tutor
	if (!file_pdf) {
		return "No se subió el archivo";
	}

	return null;
};

// Valida los datos de un personal
const validateDataPersonal = (personal, sede) => {

	// Validar datos del personal
	if (!personal.nombre || !personal.correo || !personal.universidad_origen || !personal.carrera || !personal.idioma_preferencia || !personal.nivel_preferencia || !personal.rol_preferencia) {
		return "Faltan datos del personal";
	}

	// Validar el id de la sede de participación
	if (!sede.id_sede) {
		return "Id de sede no proporcionado";
	}

	return null;
};

module.exports = {
    validatePostulacionData,
    validateSedeData,
    validateDataLogin,
    validateDataLogout,
    validateDataMentora,
    validateParticipanteTutorData,
    validateDataPersonal
};