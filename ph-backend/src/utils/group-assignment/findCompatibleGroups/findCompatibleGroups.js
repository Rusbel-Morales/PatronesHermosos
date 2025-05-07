const findCompatibleGroups = (grupos, idioma, nivel) => {
	return grupos.filter(g => g.idioma === idioma && g.nivel === nivel);
}

module.exports = findCompatibleGroups;