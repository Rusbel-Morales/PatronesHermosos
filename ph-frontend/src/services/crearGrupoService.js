// services/registrarGruposService.js
import axios from "axios";
import apiConfig from "../config/apiConfig";
import CreacionGruposPage from "../pages/panel_control_sede/CreacionGruposPage";

export const registrarGrupos = async (grupos) => {
  try {
    const id_sede = localStorage.getItem("id_sede");

    const payload = {
      id_sede: Number(id_sede),
      grupos: grupos.map(({ idioma, nivel, cupo_max }, index) => {
        console.log(`Grupo ${index + 1}:`);
        console.log("  Idioma:", idioma);
        console.log("  Nivel:", nivel);
        console.log("  Cupo:", cupo_max);
    
        return {
          idioma: Array.isArray(idioma) ? idioma[0] : idioma,
          nivel: Array.isArray(nivel) ? nivel[0] : nivel,
          cupo_max: isNaN(parseInt(cupo_max, 10)) ? 20 : parseInt(cupo_max, 10),
        };
      }),
    };
 
    console.log("Payload corregido:", payload);

    const response = await axios.post(`${apiConfig.baseUrl}/grupos/registro`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta contiene un mensaje de éxito
    if (response.data && response.data.message === "Grupos registrados con éxito") {
      console.log("Grupos registrados con éxito:", response.data);
      return response.data;  // Aquí devolvemos el objeto de la respuesta
    } else {
      // Si no hay mensaje de éxito, mostramos un error.
      console.error("Error al registrar los grupos:", response.data);
      throw new Error("No se pudieron registrar los grupos.");
    }
  } catch (error) {
    if (error.response) {
      // Manejo de errores de respuesta del servidor
      console.error("Error de respuesta del servidor:");
      console.error("URL:", error.config.url);
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      // Manejo de errores desconocidos
      console.error("Error desconocido:", error.message);
    }
    throw error;
  }
};
