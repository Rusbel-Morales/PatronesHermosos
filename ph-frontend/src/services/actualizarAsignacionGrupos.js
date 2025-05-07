import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function actualizarAsignacionGrupos(sedeId, grupos, usuariosSinGrupo) {
  try {
    const gruposLimpios = grupos.map(g => ({
      ...g,
      idioma: Array.isArray(g.idioma) ? g.idioma[0] : g.idioma,
      nivel: Array.isArray(g.nivel) ? g.nivel[0] : g.nivel
    }));
    const payload = { grupos: gruposLimpios, usuariosSinGrupo };
      // <-- Inserta aquí el log:
      console.log("Payload limpio grupos[0].idioma =", payload.grupos[0].idioma);
    // 1) Ver qué estás enviando
    console.log("[servicio] Enviando payload al API:", payload);

    const response = await axios.patch(
      `${API_BASE_URL}/grupos/actualizar-grupos-sede?id_sede=${sedeId}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    // 2) Ver qué te devuelve el servidor
    console.log(
      "[servicio] Respuesta del API:",
      "status =", response.status,
      "data =", response.data
    );

    return response.data;
  } catch (error) {
    // 3) Y, en caso de fallo, imprimir el error completo
    console.error(
      "[servicio] Error al actualizar asignación de grupos:",
      error.response?.status,
      JSON.stringify(error.response?.data, null, 2) || error
    );
    throw error;
  }
}