const supabase = require('../../config/database');

const ParticipanteModel = {
    
    /**
     * Insert a new participante into the database
     * @param {Object} participante - The participante object to be inserted
     * @param {string} participante.nombre - The name of the participante
     * @param {string} participante.correo - The email of the participante
     * @param {number} participante.edad - The age of the participante
     * @param {string} participante.escolaridad - The escolaridad of the participante
     * @param {string} participante.grado - The grado of the participante
     * @param {string} participante.permiso_tutor - The permiso_tutor of the participante
     * @param {number} participante.id_tutor - The id_tutor of the participante
     * @param {string} participante.id_sede - The id_sede of the participante
     * @returns {Promise<Object>} The object data or an error object
     */

    async createParticipante(participante) {
        const { error } = await supabase
            .from("participante")
            .insert(participante);
        
        if (error) {
            throw new Error("Error al registrar el participante: " + error.message);
        }
    },
}

module.exports = ParticipanteModel;