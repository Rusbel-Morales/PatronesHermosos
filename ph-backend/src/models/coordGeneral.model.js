const supabase = require('../../config/database');

const CoordGeneralModel = {

    /**
     * Get the password of the general coordinator
     * @param {string} username - The username of the general coordinator
     * @returns {Promise<Object>} The object data or an error object
     */

    async getNameAndPassword(username) {
        const { data, error } = await supabase
            .from("coord_general")
            .select("id_coord_general, nombre, password")
            .eq("correo", username)
            .single()
        
        if (error) {
            throw new Error("Error al obtener la contraseña de la coordinadora general: " + error.message);
        }

        return { id_coord_general: data.id_coord_general, nombre: data.nombre,  hash: data.password };
    },

    /**
     * Upload a token to the database
     * @param {string} token - The token to be uploaded
     * @param {number} id_coord_general - The id of the general coordinator
     * @returns {Promise<Object>} The object data or an error object
     */
    async subirToken(tokenData) {
        const { error } = await supabase
            .from("token")
            .insert(tokenData)

        if (error) {
            throw new Error("Error al subir el token: " + error.message);
        }
    },
    async getId(username) {
        const { data, error } = await supabase
            .from("coord_general")
            .select("id_coord_general")
            .eq("correo", username)
            .single()
        
        if (error) {
            throw new Error("Error al obtener el id de la coordinadora general: " + error.message);
        }

        return data.id_coord_general;
    },

    /**
     * Expire the token of the general coordinator
     * @param {string} username - The username of the general coordinator
     * @param {Date} timestamp - The timestamp to expire the token
     * @returns {Promise<Object>} The object data or an error
     */

    async getLastTokenRegister(id_coord_general) {
        const { data, error } = await supabase
            .from("token")
            .select("created_at")
            .eq("id_coord_general", id_coord_general)
            .order("created_at", { ascending: false }) // Los obtengo por últimos registros insertados
            .limit(1)
            .single()
        
        if (error) {
            throw new Error("Error al obtener el último registro del token")
        }

        return data;
    },
    async expireToken(id_coord_general, created_at, timestamp) {
        const { error } = await supabase
            .from("token")
            .update({ expired_at: timestamp })
            .match({ id_coord_general, created_at })

        if (error) {
            throw new Error("Error al expirar el token: " + error.message);
        }
    }
}

module.exports = CoordGeneralModel;