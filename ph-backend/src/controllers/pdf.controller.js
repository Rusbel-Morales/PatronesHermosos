const PdfService = require("../services/pdf.service.js");

const PdfController = {
	/**
	 * Descarga el archivo de convocatoria para una sede específica.
	 * @param {Object} req - El objeto de solicitud HTTP.
	 * @param {Object} res - El objeto de respuesta HTTP.
	 * @returns {Promise<void>} - Una promesa que resuelve cuando la operación se completa.
	 */

	async descargarPdf(req, res, bucket) {
		try {
			const {id} = req.params;
            if (!id) {
                return res.status(400).json({error: "Id de sede no proporcionado"});
            }

            const pdfFile = await PdfService.descargarPdfFile(id, bucket);
			res.setHeader("Content-Type", "application/pdf");
			res.send(pdfFile);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

    descargarPermisoTutor(req, res) {
        PdfController.descargarPdf(req, res, "permisos-tutores");
    },
    descargarConvocatoriaSede(req, res) {
        PdfController.descargarPdf(req, res, "convocatorias-sedes");
    }
};

module.exports = PdfController;