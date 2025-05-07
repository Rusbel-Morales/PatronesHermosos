import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getColaboradorDetalles = async () => {
    try {
        const idSede = localStorage.getItem("id_sede"); // ← obtener dinámicamente
        const response = await axios.get(`${apiConfig.baseUrl}/dashboard/coordSedeOverview`, {
          params: { id_sede: idSede },
        });
        return response.data;
      } catch (error) {
        console.error("Error en servicio DashboardSedeService:", error);
        throw error;
      }
};

export const postAceptarColaborador = async (idAplicante, datos) => {
  try {
    console.log("📤 POST a:", `${apiConfig.baseUrl}/sedes/${idAplicante}/postulaciones/aceptar`);
    console.log("📦 Cuerpo del POST:", datos);

    await axios.post(`${apiConfig.baseUrl}/sedes/${idAplicante}/postulaciones/aceptar`, datos);
  } catch (error) {
    console.error("❗ Error al intentar aceptar la postulación del colaborador:", error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Ocurrió un error al aceptar la postulación del colaborador");
  }
};

export const postRechazarColaborador = async (idAplicante, datos) => {
  try {
    await axios.post(`${apiConfig.baseUrl}/sedes/${idAplicante}/postulaciones/rechazar`, datos);
  } catch (error) {
    console.error("Error al intentar rechazar la postulación del colaborador:", error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Ocurrió un error al rechazar la postulación del colaborador");
  }
};