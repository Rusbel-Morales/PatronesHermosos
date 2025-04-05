const GrupoModel = require("../models/grupo.model.js");

const GrupoService = {
    async registrarGrupo(id_sede, num_grupo_sede) {

        // Generación de grupos de la sede con campos vacíos
        let grupos_sede = Array.from({ length: num_grupo_sede }, () => ({
            id_sede
        }));

        return await GrupoModel.createGrupo(grupos_sede);
    },
}

module.exports = GrupoService;