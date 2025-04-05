const supabase = require('../../config/database');

const TutorModel = {

    /**
     * Insert a new tutor into the database
     * @param {Object} tutor - The tutor object to be inserted
     * @param {string} tutor.nombre - The name of the tutor
     * @param {string} tutor.correo - The email of the tutor
     * @param {string} tutor.telefono - The phone of the tutor
     * @returns {Promise<Object>} The object data or an error object
     */

    async createTutor(tutor) {
        const { data, error } = await supabase
            .from("tutor")
            .insert(tutor)
            .select("id_tutor")
            .single()

        if (error) {
            throw new Error("Error al registrar el tutor: " + error.message);
        }

        return data;
    }, 
    
    /**
     * Upload the permission file of the tutor
     * @param {string} nombre_sede_transformado - The name of the transformed sede
     * @param {string} name_file_pdf - The name of the file pdf
     * @param {Object} file_pdf - The file pdf to be uploaded
     */
    async enviarPermiso(nombre_sede_transformado, name_file_pdf, file_pdf) {
        const { data, error } = await supabase
            .storage
            .from("permisos-tutores")
            .upload(`${nombre_sede_transformado}/${name_file_pdf}`, file_pdf.buffer, {
                // Enviar un archivo pdf
                contentType: "application/pdf"
            })

        if (error) {
            throw new Error("Error al subir el archivo de permiso del tutor: " + error.message);
        }

        return data;
    }
}

module.exports = TutorModel;