const supabase = require("../../config/database.js");

const MentoraModel = {
    /**
     * Insert a new mentora into the database
     * @param {Object} mentora - The mentora object to be inserted
     * @param {string} mentora.nombre - The name of the mentora
     * @param {string} mentora.correo - The email of the mentora
     * @param {number} mentora.id_sede - The id of the sede of the mentora
     * @returns {Promise<Object>} The object data or an error object
     */

    async createMentora(mentora) {
        const { error } = await supabase
            .from("mentora")
            .insert(mentora)

        if (error) {
            throw new Error("Error al registrar a la mentora " + error.message);
        }
    },
    async getMentorasBySede(id_sede) {
        const { data, error } = await supabase
            .from("mentora")
            .select("id_mentora, nombre")
            .eq("id_sede", id_sede);

        if (error) {
            throw new Error("Error al obtener las mentoras por sede: " + error.message);
        }

        return data;
    },
    async getMentorasSinGrupo(id_sede) {
        const { data, error } = await supabase
            .rpc("obt_mentoras_sin_grupo", { p_id_sede: id_sede })

        if (error) {
            throw new Error(`Error al obtener las mentoras sin grupo de la sede ${id_sede}: ${error.message}`);
        }

        return data;
    }
}

module.exports = MentoraModel;