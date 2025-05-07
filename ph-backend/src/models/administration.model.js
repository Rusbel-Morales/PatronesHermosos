const supabase = require('../../config/database');

const AdministrationModel = {

    /**
     * Get the password of the general coordinator
     * @param {string} username - The username of the general coordinator
     * @returns {Promise<Object>} The object data or an error object
     */

    async getNameAndPassword(username, rol, id) {
        const { data, error } = await supabase
            .from(rol)
            .select(`${id}, nombre, password${rol === "coord_sede" ? ", id_sede" : ""}`)
            .eq("correo", username)
            .maybeSingle() // Si no existe el usuario, no lanza error, solo devuelve null
        
        if (error) {
            throw new Error("Error al obtener la contraseña de la coordinadora: " + error.message);
        }

        return data ? { id: data[id], nombre: data.nombre, hash: data.password, rol, ...(rol === "coord_sede" ? { id_sede: data.id_sede } : {}) } : null;
    },

    /**
     * Upload a token to the database
     * @param {string} token - The token to be uploaded
     * @returns {Promise<Object>} The object data or an error object
     */

    async subirToken(tokenTable, tokenData) {
        const { error } = await supabase
            .from(tokenTable)
            .insert(tokenData)

        if (error) {
            throw new Error("Error al subir el token: " + error.message);
        }
    },
    async getIdCoord(username, rol) {
        const { data, error } = await supabase
            .from(rol)
            .select("id_" + rol)
            .eq("correo", username)
            .single()
        
        if (error) {
            throw new Error("Error al obtener el id de la coordinadora: " + error.message);
        }

        return data["id_" + rol]; // Obtengo el id de la tabla correspondiente
    },

    /**
     * Expire the token of the general coordinator
     * @param {string} username - The username of the general coordinator
     * @param {Date} timestamp - The timestamp to expire the token
     * @returns {Promise<Object>} The object data or an error
     */

    async getLastTokenRegister(tokenTable, rol, id) {
        const { data, error } = await supabase
            .from(tokenTable)
            .select("created_at")
            .eq("id_" + rol, id)
            .order("created_at", { ascending: false }) // Los obtengo por últimos registros insertados
            .limit(1)
            .single()
        
        if (error) {
            throw new Error("Error al obtener el último registro del token")
        }

        return data;
    },
    async expireToken(id, rol, tokenTable, created_at, timestamp) {
        const { error } = await supabase
            .from(tokenTable)
            .update({ expired_at: timestamp })
            .match({ ["id_" + rol]: id, created_at })

        if (error) {
            throw new Error("Error al expirar el token: " + error.message);
        }
    },
    async deleteData() {
        const { error } = await supabase
            .rpc("delete_data")
        
        if (error) {
            throw new Error("Error al eliminar los datos: " + error.message);
        }
    },
    async getEstadisticas() {
        const { data, error } = await supabase
            .rpc("crear_estadisticas")
        
        if (error) {
            throw new Error("Error al crear las estadísticas: " + error.message);
        }

        return data;
    }

}

module.exports = AdministrationModel;