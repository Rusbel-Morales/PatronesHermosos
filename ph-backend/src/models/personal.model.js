// personal.model.js
// Descripción: Modelo para la gestión de personal.

const supabase = require("../../config/database.js");

const PersonalModel = {

    /**
     * Insert a new personalAlumna into the database
     * @param {Object} personal - The personalAlumna object to be inserted
     * @param {string} personal.nombre - The name of the personal
     * @param {string} personal.correo - The email of the personal
     * @param {string} personal.universidad_origen  - The universidad_origen of the personal
     * @param {string} personal.sede_participacion  - The sede_participacion of the personal
     * @param {string} personal.carrera - The carrera of the personal
     * @param {string} personal.idioma_preferencia - The idioma_preferencia of the personal
     * @param {string} personal.nivel_preferencia - The nivel_preferencia of the personal
     * @param {string} personal.rol_preferencia - The rol_preferencia of the personal
     * @param {string} personal.id_sede - The id_sede of the personal
     * @returns {Promise<Object>} The object data or an error object
     */
    async createPersonal(personal) {
        const { error } = await supabase
            .from("personal")
            .insert(personal)

        if (error) {
            throw new Error("Error al registrar al personal " + error.message);
        }
    }
}

module.exports = PersonalModel;