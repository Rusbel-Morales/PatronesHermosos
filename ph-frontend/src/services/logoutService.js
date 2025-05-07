import axios from 'axios';
import apiConfig from "@/config/apiConfig.js";

export const postLogout = async (token) => {
	try {
		const response = await axios.patch(`${apiConfig.baseUrl}/administration/logout`, {}, {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
		return response.data.message;
	} catch (error) {
		throw new Error("Error al cerrar sesión: " + error.message);
	}
}