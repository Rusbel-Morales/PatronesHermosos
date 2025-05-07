const supabase = require('../../config/database.js');

const CoordGeneralModel = {
    async getHashPassword() {
        const { data, error } = await supabase
            .from("coord_general")
            .select("password")
            .single();

        if (error) {
            throw new Error("Error al obtener la contraseña de la coordinadora general: " + error.message);
        }

        return { passwordHash: data.password };
    }
}

module.exports = CoordGeneralModel;