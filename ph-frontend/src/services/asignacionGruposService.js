// services/dashboardSedeService.js
import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getAsignacionGruposOverview = async () => {
  try {
    const idSede = localStorage.getItem("id_sede"); // ← obtener dinámicamente
    const response = await axios.get(`${apiConfig.baseUrl}/grupos/generar-grupos-automaticos`, {
      params: { id_sede: idSede },
    });
    // Desestructuramos según la nueva respuesta
    const { grupos: gruposData, usuariosSinGrupo } = response.data;

    // Usuarios sin grupo: participantes y demás personal (con etiqueta de rol)
    const participantesSinGrupo = usuariosSinGrupo.participante || [];
    const personalSinGrupo = [
      ...(usuariosSinGrupo.staff || []).map(item => ({ ...item, rol_preferencia: 'staff' })),
      ...(usuariosSinGrupo.instructora || []).map(item => ({ ...item, rol_preferencia: 'instructora' })),
      ...(usuariosSinGrupo.facilitadora || []).map(item => ({ ...item, rol_preferencia: 'facilitadora' })),
      ...(usuariosSinGrupo.mentora || []).map(item => ({ ...item, rol_preferencia: 'mentora' })),
    ];

    // Aplanamos los inscritos dentro de cada grupo para llevarlos a propiedades de nivel superior
    const grupos = (gruposData || []).map(grupo => ({
      ...grupo,
      ...grupo.inscritos,
    }));

    return {
      grupos,
      participantesSinGrupo,
      personalSinGrupo
    };
  } catch (error) {
    console.error("Error en servicio asignacionGruposService:", error);
    throw error;
  }
};