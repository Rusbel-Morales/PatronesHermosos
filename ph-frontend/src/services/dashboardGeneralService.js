// services/dashboardGeneralService.js
import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getDashboardOverview = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/dashboard/overview`);
    return response.data;
  } catch (error) {
    console.error("Error en servicio DashboardGeneral:", error);
    throw error;
  }
};