function assignMentoras(grupos, mentoras) {
	for (let i = 0; i < grupos.length; i += 2) {
		const mentora = mentoras.pop();
		grupos[i].inscritos.mentora.push(mentora);
		if (grupos[i + 1]) grupos[i + 1].inscritos.mentora.push(mentora);
	}

	return mentoras;
}

module.exports = assignMentoras;