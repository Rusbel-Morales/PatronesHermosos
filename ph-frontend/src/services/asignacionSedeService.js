// services/dashboardSedeService.js
import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getAsignacionSedeOverview = async () => {
  try {
    const idSede = localStorage.getItem("id_sede"); // ← obtener dinámicamente
    const response = await axios.get(`${apiConfig.baseUrl}/grupos/obtener-grupos-sede`, {
      params: { id_sede: idSede },
    });
    return response.data;
  } catch (error) {
    console.error("Error en servicio asignacionSedeService:", error);
    throw error;
  }
};