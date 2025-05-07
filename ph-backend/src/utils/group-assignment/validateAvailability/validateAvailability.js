function validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras) {
	if (
		instructoras.length < grupos.length ||
		facilitadoras.length < grupos.length * 2 ||
		staffList.length < grupos.length ||
		mentoras.length < Math.ceil(grupos.length / 2)
	) {
		throw new Error("No hay suficientes personas para cubrir todos los roles.");
	}
}

module.exports = validateAvailability;