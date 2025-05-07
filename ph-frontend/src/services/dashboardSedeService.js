// services/dashboardSedeService.js
import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getDashboardSedeOverview = async () => {
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