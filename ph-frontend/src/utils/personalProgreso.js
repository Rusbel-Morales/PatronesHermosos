export const calcularProgresoPersonal = (formData) => {
    const totalFields = Object.keys(formData.personal).length + 1; // Sede seleccionada

    let filledFields = 0;

    Object.values(formData.personal).forEach((value) => {
        if (typeof value === "string" && value.trim() !== "") filledFields++;
    });

    if (formData.sede && formData.sede.id_sede > 0) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
};