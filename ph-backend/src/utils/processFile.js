const path = require("path");

// Crear un id para el nombre del archivo
function uniqueFileName(file_pdf) {
    const timestamp_miliseconds = Date.now();
    const timestamp = new Date(timestamp_miliseconds).toISOString();
    const parsed = path.parse(file_pdf.originalname);
    return `${parsed.name + "-" + timestamp + parsed.ext}`;
}

// Transformar el nombre de la sede a un formato adecuado para la carpeta (quitar acentos, espacios y convertir a minúsculas)
function transformNameSede(nombre_sede) {
    return nombre_sede.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("-"); // Formato: nombre-sede
}

// Transformar el nombre del permiso del tutor a un formato adecuado para el archivo (quitar acentos, espacios y convertir a minúsculas)
function transformNamePermisoTutor(nombre_permiso_tutor) {
    // Obtener el nombre y la extensión del archivo
    const { name, ext } = path.parse(nombre_permiso_tutor);
    // Decodificar el texto de un formato codificado a UTF-8
    nombre_permiso_tutor = Buffer.from(name, 'latin1').toString('utf8');
    return nombre_permiso_tutor.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("-") + ext; // Formato: nombre-permiso-tutor
}

module.exports = { uniqueFileName, transformNameSede, transformNamePermisoTutor };