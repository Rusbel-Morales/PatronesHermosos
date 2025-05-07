/**
 * @typedef {Object} Grupo
 * @property {string} id
 * @property {string} idioma
 * @property {string} nivel
 * @property {number} cupo_max
 * @property {number[]} facilitadoras
 * @property {number|null} instructora
 * @property {number|null} staff
 */

/**
 * @typedef {Object} Personal
 * @property {number} id
 * @property {'Español'|'Inglés'} idioma_preferencia
 * @property {'Básico'|'Avanzado'} nivel_preferencia
 * @property {'Facilitadora'|'Instructora'|'Staff'} rol_preferencia
 */

/**
 * Asigna instructora, facilitadoras y staff a grupos compatibles según idioma y nivel.
 *
 * @param {Grupo[]} grupos
 * @param {Personal[]} instructoras
 * @param {Personal[]} facilitadoras
 * @param {Personal[]} staffList
 * @returns {{
 *   gruposConPersonal: Grupo[],
 *   personalSinGrupo: Personal[]
 * }}
 */
function assignAssociatesWithPreferences(grupos, instructoras, facilitadoras, staffList) {
	const instructorasSinGrupo = [];
	const facilitadorasSinGrupo = [];
	const staffSinGrupo = [];

	// Asignar instructoras
	for (const instr of instructoras) {
		const grupoCompatible = grupos.find(g =>
			g.inscritos.instructora.length === 0 &&
			g.idioma === instr.idioma_preferencia &&
			g.nivel === instr.nivel_preferencia
		);
		if (grupoCompatible) {
			grupoCompatible.inscritos.instructora.push({ id_personal: instr.id_personal, nombre: instr.nombre, idioma: instr.idioma_preferencia, nivel: instr.nivel_preferencia });
		} else {
			instructorasSinGrupo.push({ id_personal: instr.id_personal, nombre: instr.nombre, idioma: instr.idioma_preferencia, nivel: instr.nivel_preferencia });
		}
	}

	// Asignar facilitadoras (2 por grupo)
	for (const fac of facilitadoras) {
		const grupoCompatible = grupos.find(g =>
			g.inscritos.facilitadora.length < 2 &&
			g.idioma === fac.idioma_preferencia &&
			g.nivel === fac.nivel_preferencia
		);
		if (grupoCompatible) {
			grupoCompatible.inscritos.facilitadora.push({ id_personal: fac.id_personal, nombre: fac.nombre, idioma: fac.idioma_preferencia, nivel: fac.nivel_preferencia });
		} else {
			facilitadorasSinGrupo.push({ id_personal: fac.id_personal, nombre: fac.nombre, idioma: fac.idioma_preferencia, nivel: fac.nivel_preferencia });
		}
	}

	// Asignar staff
	for (const staff of staffList) {
		const grupoCompatible = grupos.find(g =>
			g.inscritos.staff.length === 0 &&
			g.idioma === staff.idioma_preferencia &&
			g.nivel === staff.nivel_preferencia
		);
		if (grupoCompatible) {
			grupoCompatible.inscritos.staff.push({ id_personal: staff.id_personal, nombre: staff.nombre, idioma: staff.idioma_preferencia, nivel: staff.nivel_preferencia });
		} else {
			staffSinGrupo.push({ id_personal: staff.id_personal, nombre: staff.nombre, idioma: staff.idioma_preferencia, nivel: staff.nivel_preferencia });
		}
	}

	return {
		gruposConPersonal: grupos,
		instructorasSinGrupo,
		facilitadorasSinGrupo,
		staffSinGrupo,
	};
}

module.exports = assignAssociatesWithPreferences;