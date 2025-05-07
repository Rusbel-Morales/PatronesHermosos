
import axios from "axios";
import apiConfig from "../config/apiConfig";

export const getSedesDetalles = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/sedes/${id}/detalles`);
    return response.data;
  } catch (error) {
    console.error("Error en servicio SedesDetalles:", error);
    
    // Si el servidor devuelve un error con mensaje, lo propagamos
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error("Ocurrió un error al obtener los detalles de las sedes");
  }
};

export const postAceptarSede = async (idSede) => {
  try {
    console.log(idSede);
    await axios.post(`${apiConfig.baseUrl}/sedes/${idSede}/aceptar`);
  } catch (error) {
    console.error("Error al intentar enviar petición HTTP de aceptar sede: ", error);

    // Si el servidor devuelve un error con mensaje, lo propagamos
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Ocurrió un error al aceptar una sede");
  }
}

export const postRechazarSede = async (idSede) => {
  try {
    console.log(idSede);
    await axios.post(`${apiConfig.baseUrl}/sedes/${idSede}/rechazar`);
  } catch (error) {
    console.error("Error al intentar enviar petición HTTP de rechazar sede: ", error);

    // Si el servidor devuelve un error con mensaje, lo propagamos
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Ocurrió un error al rechazar una sede");
  }
}