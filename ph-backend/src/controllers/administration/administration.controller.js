const AdministrationService = require("../../services/administration/administration.service.js");
const { validateDataLogin, validateDataLogout } = require("../../utils/validateData.js");

const AdministrationController = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Validaciones de los datos
            const error = validateDataLogin(username, password);
            if (error) {
                return res.status(400).json({ error });
            }
            
            // Verificar las credenciales de la coordinadora general
            const [nombre, token, rol, sedeData] = await AdministrationService.verificarCredenciales(username, password);
            res.status(200).json({ message: "Inicio de sesión exitoso", nombre, token, rol, sedeData });
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
            const { username, rol, tokenTable } = req.user;

            // Validación de datos
            const error = validateDataLogout(username, rol, tokenTable);
            if (error) {
                return res.status(400).json({ error });
            }
            
            // Cerrar la sesión de la coordinadora general
            await AdministrationService.expirarToken(username, rol, tokenTable);
            res.status(200).json({ message: "Cierre de sesión exitoso" });
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },
    async deleteData(_, res) {
        try {
            await AdministrationService.deleteData();
            res.status(200).json({ message: "Base de datos eliminada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async crearEstadisticas(_, res) {
        try {
            const { csv, fileName } = await AdministrationService.crearEstadisticas();
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'text/csv');
            res.send(csv);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AdministrationController;