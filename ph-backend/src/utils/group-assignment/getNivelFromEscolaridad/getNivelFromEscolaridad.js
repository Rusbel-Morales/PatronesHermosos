const getNivelFromEscolaridad = (escolaridad) => {
	return escolaridad === "Secundaria" ? "Básico" : "Avanzado";
}

module.exports = getNivelFromEscolaridad;