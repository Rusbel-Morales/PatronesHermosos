const getNivelFromEscolaridad = require("../getNivelFromEscolaridad/getNivelFromEscolaridad");
const findCompatibleGroups = require("../findCompatibleGroups/findCompatibleGroups");
const hasCupoDisponible = require("../hasCupoDisponible/hasCupoDisponible");

/**
 * @typedef {Object} Participante
 * @property {number} id
 * @property {'Español'|'Inglés'} idioma_preferencia
 * @property {'Secundaria'|'Preparatoria'} escolaridad
 */

/**
 * Asigna participantes a grupos compatibles (idioma y nivel), respetando cupo.
 *
 * @param {Grupo[]} grupos
 * @param {Participante[]} participantes
 * @returns {{
 *   gruposConParticipantes: Grupo[],
 *   participantesSinGrupo: Participante[]
 * }}
 */

function distributeParticipantsWithPreferences(grupos, participantes) {
	const turnoPorClave = {}; // clave: `${idioma}|${nivel}`
	const participantesSinGrupo = [];

	for (const participante of participantes) {
		const nivel = getNivelFromEscolaridad(participante.escolaridad);
		const clave = `${participante.idioma_preferencia}|${nivel}`;

		const compatibles = findCompatibleGroups(grupos, participante.idioma_preferencia, nivel);

		if (!turnoPorClave[clave]) turnoPorClave[clave] = 0;

		const compatiblesConCupo = compatibles.filter(g => hasCupoDisponible(g));

		if (compatiblesConCupo.length > 0) {
			const grupoIndex = turnoPorClave[clave] % compatiblesConCupo.length;
			const grupoAsignado = compatiblesConCupo[grupoIndex];
			grupoAsignado.inscritos.participante.push({ id_participante: participante.id_participante, nombre: participante.nombre, idioma: participante.idioma_preferencia, nivel: participante.escolaridad === "Preparatoria" ? "Avanzado" : "Básico" });
			grupoAsignado.cupo_actual++; // Actualizamos el cupo del grupo

			turnoPorClave[clave]++; // avanzamos el turno
		} else {
			participantesSinGrupo.push({ id_participante: participante.id_participante, nombre: participante.nombre, idioma: participante.idioma_preferencia, nivel: participante.escolaridad === "Preparatoria" ? "Avanzado" : "Básico" });
		}
	}

	return {
		gruposConParticipantes: grupos,
		participantesSinGrupo
	};
}

module.exports = distributeParticipantsWithPreferences;