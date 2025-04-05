import axios from "axios";
import apiConfig from "../config/apiConfig";

export const fetchSedesPersonal = async () => {
	const response = await axios.get(`${apiConfig.baseUrl}/sedes/obtenerSedes`, {
		headers: { "ngrok-skip-browser-warning": "true" }
	});

	return response.data.length
		? response.data.map(sede => ({ label: sede.nombre_sede, value: sede.id_sede.toString() }))
		: [{ label: "Puebla", value: "18" }];
};

export const createPersonal = async (personalData) => {
	const response = await axios.post(`${apiConfig.baseUrl}/personal/registro`, personalData, {
		headers: { "Content-Type": "application/json" }
	});

	return response.data;
};