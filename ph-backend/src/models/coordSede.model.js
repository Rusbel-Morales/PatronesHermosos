// coordSede.model.js
// Descripción: Modelo para la gestión de coordinadoras de sede.

const supabase = require('../../config/database');

/**
 * Insert a new coordSede into the database
 * @param {Object} coordSede - The coordSede object to be inserted
 * @param {string} coordSede.nombre - The name of the sede coordinator
 * @param {string} coordSede.correo - The email of the sede coordinator
 * @param {string} coordSede.telefono - The phone number of the sede coordinator
 * @param {number} coordSede.id_sede - The id of the sede coordinator
 * @returns {Promise<Object>} The object data or an error object
 */

const CoordSedeModel = {
    async createCoordSede(coordSede) {
        const { error } = await supabase
            .from("coord_sede")
            .insert(coordSede);
        
        if (error) {
            throw new Error("Error al registrar la coordinadora de sede: " + error.message);
        }
    }
}

module.exports = CoordSedeModel;