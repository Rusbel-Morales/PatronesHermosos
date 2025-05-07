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


export const getParticipante = async (id) => {
	try {
	  const part = await axios.get(`${apiConfig.baseUrl}/participantes/listar?id_sede=${id}`);
	  return part.data;
	} catch (error) {
	  console.error("Error en servicio SedesDetalles:", error);
	  
	  // Si el servidor devuelve un error con mensaje, lo propagamos
	  if (error.response && error.response.data && error.response.data.error) {
		throw new Error(error.response.data.error);
	  }
	  
	  throw new Error("Ocurrió un error al obtener los detalles de las sedes");
	}
  };