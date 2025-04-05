const CoordGeneralService = require("../services/coordGeneral.service");

function validateData(username, password) {

    // Validar datos de la coordinadora general
    if (!username || !password) {
        return "Faltan datos de la coordinadora general";
    }

    return null;

}
const CoordGeneralController = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Validaciones de los datos
            const error = validateData(username, password);
            if (error) {
                return res.status(400).json({ error });
            }
            
            // Verificar las credenciales de la coordinadora general
            const [nombre, token] = await CoordGeneralService.verificarCredenciales(username, password);
            res.status(200).json({ message: "Inicio de sesión exitoso", nombre, token });
        } catch(error) {
            if (error.message === "El usuario ingresado no existe") {
                return res.status(404).json({ error: error.message });
            }

            if (error.message === "Credenciales inválidas") {
                return res.status(401).json({ error: error.message });
            }

            res.status(500).json({ error: error.message });
        }
    },
    async logout(req, res) {
        try {
            const { username } = req.user;
            
            // Cerrar la sesión de la coordinadora general
            await CoordGeneralService.expirarToken(username);
            
            res.status(200).json({ message: "Cierre de sesión exitoso" });
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CoordGeneralController;