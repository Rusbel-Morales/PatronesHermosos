import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getColaborador = async (id) => {
	try {
	  const part = await axios.get(`${apiConfig.baseUrl}/personal/listar?id_sede=${id}`);
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