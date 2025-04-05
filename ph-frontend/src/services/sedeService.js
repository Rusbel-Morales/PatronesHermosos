import axios from "axios";
import apiConfig from "../config/apiConfig";

export const createSede = async (sedeData) => {
	const formData = new FormData();

	const jsonData = {
		coordSede: sedeData.coordSede,
		sede: sedeData.sede,
	};

	formData.append("data", JSON.stringify(jsonData));

	if (sedeData.archivo) {
		formData.append("convocatoria_firmada", sedeData.archivo);
	}
	
	const response = await axios.post(`${apiConfig.baseUrl}/sedes/registro`, formData, {
		headers: { "Content-Type": "multipart/form-data" }
	});

	return response.data;
};