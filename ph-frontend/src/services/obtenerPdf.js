import axios from "axios";
import apiConfig from "../config/apiConfig";

export const obtenerPdf = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/sedes/${id}/convocatoria`, {
        headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ1c2JlbGFsZWphbmRyb21AZ21haWwuY29tIiwicGFzc3dvcmQiOiIjcnVzYmVsLTExMDkiLCJpYXQiOjE3NDM4MTA1NjJ9.zEXZ_DrwvUUnQmVis1oVXlzaUJLu_8NuItlKcjdCcGQ` },
        responseType: "arraybuffer"
    })
    return response.data;
  } catch (error) {
    console.error("Error al obtener el PDF:", error);
  }
}