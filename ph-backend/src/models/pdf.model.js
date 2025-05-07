const supabase = require("../../config/database.js");

const PdfModel = {

    /**
	 * Obtains the path of the signed convocatoria for a specific sede.
	 * @param {string} id_sede - The ID of the sede.
	 * @returns {Promise<string>} The path of the signed convocatoria.
	 * @throws {Error} If there is an error obtaining the signed convocatoria.
	 */

	async getPdfFilePathById(id, tableName, columnName) {
		const {data, error} = await supabase
			.from(tableName)
			.select(columnName)
			.eq("id_" + tableName, id)
			.single();

		if (error) {
			throw new Error("Error al obtener la convocatoria firmada: " + error.message);
		}

		return data[columnName];
	},

	/**
	 * Descarga el archivo de convocatoria para una sede específica.
	 * @returns {Promise<Object>} Los datos del archivo de convocatoria o un objeto de error.
	 * @throws {Error} Si hay un error al descargar el archivo de convocatoria.
	 * @param fileName {string} - La ruta del archivo de convocatoria en el almacenamiento de Supabase.
	 */
	async descargarPdfFile(fileName, bucket) {
		const {data, error} = await supabase
			.storage
			.from(bucket)
			.download(fileName);

		if (error) {
			const errorType = bucket === "convocatorias-sedes" ? "de la convocatoria de la sede" : "del permiso del tutor";
			throw new Error(`Error al descargar el archivo pdf ${errorType}: ` + error.message);
		}

		return data;
	}
}

module.exports = PdfModel;
