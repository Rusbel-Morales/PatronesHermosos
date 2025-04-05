import axios from "axios";
import apiConfig from "../config/apiConfig";

export const fetchSedesParticipante = async () => {
	const response = await axios.get(`${apiConfig.baseUrl}/sedes/obtenerSedes`, {
		headers: { "ngrok-skip-browser-warning": "true" }
	});

	return response.data.length
		? response.data.map(sede => ({ label: sede.nombre_sede, value: sede.id_sede.toString() }))
		: [{ label: "Puebla", value: "18" }];
};

export const createParticipante = async (participanteData) => {
	const formData = new FormData();

	const jsonData = {
		participante: participanteData.participante,
		tutor: participanteData.tutor,
		sede: participanteData.sede
	};

	formData.append("data", JSON.stringify(jsonData));

	if (participanteData.archivo) {
		formData.append("permiso_tutor", participanteData.archivo);
	}

	const response = await axios.post(`${apiConfig.baseUrl}/participantes/registro`, formData, {
		headers: { "Content-Type": "multipart/form-data" }
	});

	return response.data;
};