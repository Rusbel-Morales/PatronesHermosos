import axios from "axios";
import apiConfig from "../config/apiConfig";
import { getToken } from "./authHelper"; // Asegúrate que esta ruta es correcta

export const obtenerPdf = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiConfig.baseUrl}/sedes/${id}/descargar-convocatoria-sede`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    });

    return response.data;
  } catch (error) {
    console.error("Error al descargar la convocatoria de la sede:", error);
    throw error;
  }
};

export const descargarPermisoTutor = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiConfig.baseUrl}/participantes/${id}/descargar-permiso-tutor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    });

    return response.data;
  } catch (error) {
    console.error("Error al descargar el permiso de tutor del participante:", error);
    throw error;
  }
};