const supabase = require('../../config/database');

/**
 * Insert a new coordAsociada into the database
 * @param {Object} coordAsociada - The coordAsociada object to be inserted
 * @param {string} coordAsociada.nombre - The name of the coordAsociada
 * @param {string} coordAsociada.correo - The email of the coordAsociada
 * @param {number} coordAsociada.id_coord_sede - The id of the sede coordAsociada
 * @returns {Promise<Object>} The object data or an error object
 */

const CoordAsociadaModel = {
    async createCoordAsociada(coordAsociada) {
        const { error } = await supabase
            .from("coordAsociada")
            .insert(coordAsociada);

        if (error) {
            throw new Error("Error al registrar la coordinadora asociada: " + error.message);
        }
    }
}

module.exports = CoordAsociadaModel;