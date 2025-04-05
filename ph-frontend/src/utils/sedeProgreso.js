export const calcularProgresoSede = (formData) => {
    // Si la fecha de inicio solo se llena vía select, 
    // se supone que 'fecha_inicio' ya está en formData.sede y se debe contar una sola vez.
    // Por ello, totalFields será:
    const totalFields =
        Object.keys(formData.coordSede).length +
        Object.keys(formData.sede).length +
        1; // archivo convocatoria

    let filledFields = 0;

    // Validación de los campos de coordSede
    Object.values(formData.coordSede).forEach((value) => {
        if (typeof value === "string" && value.trim() !== "") filledFields++;
    });

    // Validación de los campos de sede
    Object.entries(formData.sede).forEach(([key, value]) => {
        // Para el campo de fecha, se asegura que no esté vacío
        if (key === "fecha_inicio") {
            if (typeof value === "string" && value.trim() !== "") filledFields++;
        } else {
            if (typeof value === "string" && value.trim() !== "") filledFields++;
            if (key === "num_grupos_sede" && typeof value === "number" && value > 0) filledFields++;
        }
    });

    // Validación del archivo de convocatoria
    if (formData.archivo instanceof File) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
};