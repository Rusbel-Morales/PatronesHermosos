// tablaSedesService.js
import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getSedes = async () => {
		try {
				const response = await axios.get(`${apiConfig.baseUrl}/sedes/obtenerTodaInfoSedes`);
				return response.data;
		} catch (error) {
				console.error("Error fetching sedes:", error);
				throw error;
		}
}