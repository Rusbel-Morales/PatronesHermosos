const PdfModel = require("../models/pdf.model.js");

const PdfService = {
    async obtenerRutaPermisoTutor(id) {
        return await PdfModel.getPdfFilePathById(id, "participante", "permiso_tutor");
    },
    async obtenerRutaConvocatoriaSede(id) {
        return await PdfModel.getPdfFilePathById(id, "sede", "convocatoria_firmada");
    },
    async descargarPdfFile(id, bucket) {        
        // Definir las acciones dependiendo del bucket
        const ACTIONS = {
            "convocatorias-sedes": PdfService.obtenerRutaConvocatoriaSede,
            "permisos-tutores": PdfService.obtenerRutaPermisoTutor
        };

        // Ejecutar la acción correspondiente
        const pdfPath = await ACTIONS[bucket](id);

        // Modificar el path dependiendo del bucket
        const MODIFY_PATH_ACTIONS = {
            "convocatorias-sedes": (path) => path.split("/").slice(-1).join("/"),
            "permisos-tutores": (path) => path.split("/").slice(-2).join("/")
        };

        // Ejecutar la acción de modificación correspondiente
        const pdfPathModified = MODIFY_PATH_ACTIONS[bucket](pdfPath);

        // Descargar el archivo pdf
        const pdfFile = await PdfModel.descargarPdfFile(pdfPathModified, bucket);

		const arrayBuffer = await pdfFile.arrayBuffer();
		return Buffer.from(arrayBuffer);
	},
}

module.exports = PdfService;