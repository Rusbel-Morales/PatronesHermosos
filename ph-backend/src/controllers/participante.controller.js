// participante.controller.js
// Se encarga de definir la lógica de las rutas relacionadas con los participantes en la API REST, utilizando el servicio ParticipanteService.

const ParticipanteService = require("../services/participante.service.js");
const TutorService = require("../services/tutor.service.js");

function validateData(participante, tutor, sede, file_pdf) {

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
}

// Pendiente de aprobación
// Obtener el tamaño del archivo en bytes y convertirlo a megabytes
// const fileSize = file_pdf.size / (1024 * 1024); // 1 MB = 1024 KB, 1 KB = 1024 bytes
// console.log("Tamaño del archivo:", fileSize, "MB");

const ParticipanteController = {
    async registrarParticipante(req, res) {
        try {
            const { data } = req.body;
            const { participante, tutor, sede } = JSON.parse(data);
            const file_pdf = req.file;

            // Validaciones de los datos
            const error = validateData(participante, tutor, sede, file_pdf);
            if (error) {
                return res.status(400).json({ error });
            }

            // Insertar tutor en la base de datos
            const [id_tutor, fullPath] = await TutorService.registrarTutor(tutor, sede.nombre_sede, file_pdf);
            
            // Insertar participante en la base de datos
            await ParticipanteService.registrarParticipante(participante, id_tutor, fullPath, sede.id_sede);

            res.status(201).json({ message: "Participante y tutor registrado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ParticipanteController;