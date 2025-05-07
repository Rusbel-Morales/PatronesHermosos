import axios from "axios";
import apiConfig from "../config/apiConfig";

export const registerMentora = async (mentoraData) => {
  try {
    // Validar que existan los datos de la mentora
    if (!mentoraData.mentora || !mentoraData.mentora.nombre || !mentoraData.mentora.correo) {
      throw { response: { status: 400, data: { error: "Faltan datos de la mentora" } } };
    }

    // Validar que exista el id de la sede
    if (!mentoraData.id_sede) {
      throw { response: { status: 400, data: { error: "Id de sede no proporcionado" } } };
    }

    const response = await axios.post(`${apiConfig.baseUrl}/mentora/registro`, mentoraData, {
      headers: { 
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true" 
      }
    });

    return response.data;
  } catch (error) {
    // Si el error ya tiene una respuesta estructurada, lo relanzamos
    if (error.response) {
      throw error;
    }
    // Para otros tipos de errores (como problemas de red)
    throw { 
      response: { 
        status: 500, 
        data: { error: error.message || "Error interno del servidor" } 
      } 
    };
  }
};