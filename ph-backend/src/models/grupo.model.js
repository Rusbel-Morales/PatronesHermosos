const supabase = require('../../config/database');

const GrupoModel = {

    /**
     * Insert a new grupo into the database
     * @param {Object} grupo - The grupo object to be inserted
     * @param {number} grupo.id_sede - The id of the sede where the grupo is located
     * @returns {Promise<Object>} The object data or an error object
     */

    async createGrupo(grupo) {
        const { error} = await supabase
            .from("grupo")
            .insert(grupo)

        if (error) {
            throw new Error("Error al registrar el grupo: " + error.message);
        }
    }
}

module.exports = GrupoModel;