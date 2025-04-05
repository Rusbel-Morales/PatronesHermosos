const SedeService = require("../services/sede/sede.service");

const DashboardController = {
    async getDashboardData(_, res) {
        try {
            const [obtenerSedesPendientes, obtenerSedesEstado, obtenerTopSedes, numeroSolicitudesSedes] = await Promise.all([
                SedeService.obtenerSedesPendientes(),
                SedeService.obtenerSedesEstado(),
                SedeService.obtenerTopSedes(),
                SedeService.obtenerNumeroSolicitudesSedes()
            ]);
            res.status(200).json({ obtenerSedesPendientes, obtenerSedesEstado, obtenerTopSedes, numeroSolicitudesSedes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = DashboardController;