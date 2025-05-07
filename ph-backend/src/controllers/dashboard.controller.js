const SedeService = require("../services/sede/sede.service.js");
const PersonalService = require("../services/personal.service.js");
const ParticipanteService = require("../services/participante.service.js");

const DashboardController = {
    async getCoordGeneralDashboardData(_, res) {
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
    },
    async getCoordSedeDashboardData(req, res) {
        try {
            const { id_sede } = req.query;

            if (!id_sede) {
                return res.status(400).json({ error: "Id de sede no proporcionado" });
            }

            const [usuariosEstadoRol, totalPersonalRol, participantesPorEstado, numSolicitudes, participantesPendientes, personalPendiente] = await Promise.all([
                PersonalService.obtenerUsuariosEstadoRol(id_sede),
                PersonalService.obtenerTotalPersonalRol(id_sede),
                ParticipanteService.participantesEstado(id_sede),
                ParticipanteService.numSolicitudesParticipantesPersonal(id_sede),
                ParticipanteService.obtenerParticipantesPendientes(id_sede),
                PersonalService.obtenerPersonalPendiente(id_sede)
            ])

            res.status(200).json({ usuariosEstadoRol, totalPersonalRol, participantesPorEstado, numSolicitudes, participantesPendientes, personalPendiente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = DashboardController;