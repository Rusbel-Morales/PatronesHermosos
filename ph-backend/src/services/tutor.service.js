// tutor.service.js
// Descripción: Lógica de negocio para la gestión de tutores.

const TutorModel = require('../models/tutor.model');
const { transformNameSede, uniqueFileName, transformNamePermisoTutor } = require("../utils/processFile.js");

const TutorService = {
    async registrarTutor(tutor, nombre_sede, file_pdf) {

        // Transformar el nombre de la sede a un formato adecuado para la carpeta
        const nombreCarpeta = transformNameSede(nombre_sede);

        // Crear un nombre único para el archivo de permiso del tutor
        const nombrePermisoTutor = uniqueFileName(file_pdf);

        const nombrePermisoTutorTransformado = transformNamePermisoTutor(nombrePermisoTutor);

        // Insertar el archivo de permiso del tutor en el storage de supabase
        const { fullPath } = await TutorModel.enviarPermiso(nombreCarpeta, nombrePermisoTutorTransformado, file_pdf);

        // Insertar el tutor en la base de datos
        const { id_tutor } = await TutorModel.createTutor(tutor);
        return [id_tutor, fullPath];
    }
};

module.exports = TutorService;