export const calcularProgresoParticipante = (formData) => {
    const totalFields =
        Object.keys(formData.participante).length +
        Object.keys(formData.tutor).length +
        1 + // archivo
        1;  // sede seleccionada

    let filledFields = 0;

    Object.values(formData.participante).forEach((value) => {
        if (typeof value === "string" && value.trim() !== "") filledFields++;
        if (typeof value === "number" && value > 0) filledFields++;
    });

    Object.values(formData.tutor).forEach((value) => {
        if (typeof value === "string" && value.trim() !== "") filledFields++;
    });

    if (formData.archivo instanceof File) filledFields++;
    if (formData.sede && formData.sede.id_sede > 0) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
};