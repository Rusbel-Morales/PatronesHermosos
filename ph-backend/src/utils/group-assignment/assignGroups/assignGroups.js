const validateAvailability = require("../validateAvailability/validateAvailability");
const initializeGroups = require("../initializeGroups/initializeGroups");
const assignAssociatesWithPreferences = require("../assignAssociates/assignAssociates");
const assignMentoras = require("../assignMentors/assignMentors");
const distributeParticipantsWithPreferences = require("../distributeParticipants/distributeParticipants");

/**
 * Asigna automáticamente participantes y personal a grupos,
 * respetando idioma y nivel de preferencia, y dejando sin asignar
 * a quienes no puedan ser colocados por falta de compatibilidad.
 *
 * @param {Grupo[]} grupos - Lista de grupos con idioma, nivel, cupo_max
 * @param {Object[]} participantes - Lista de participantes con id, idioma_preferencia, escolaridad
 * @param {Object[]} instructoras - Lista de personal (id, idioma_preferencia, nivel_preferencia, rol_preferencia)
 * @param {Object[]} facilitadoras - "
 * @param {Object[]} staff - "
 * @param {number[]} mentoras - Lista de IDs de mentoras (sin preferencias)
 *
 * @returns {{
 *   grupos: Grupo[],
 *   sinGrupo: {
 *     participantes: Object[],
 *     personal: Object[]
 *   }
 * }}
 */

function assignGroups(
	grupos,
	participantes,
	instructoras,
	facilitadoras,
	staff,
	mentoras
) {
	// Validación inicial con solo los IDs de cada rol
	validateAvailability(
		grupos,
		instructoras,
		facilitadoras,
		staff,
		mentoras
	);

	// Inicializar campos de los grupos (participantes, instructora, etc.)
	grupos = initializeGroups(grupos);

	// Asignar personal con preferencias (pueden quedar sin grupo)
	const {
		gruposConPersonal,
		instructorasSinGrupo,
		facilitadorasSinGrupo,
		staffSinGrupo
	} = assignAssociatesWithPreferences(grupos, instructoras, facilitadoras, staff);

	// Asignar mentoras como siempre (una por cada 1–2 grupos)
	const mentorasSinGrupo = assignMentoras(gruposConPersonal, mentoras);

	// Asignar participantes con idioma/nivel (pueden quedar sin grupo)
	const {
		gruposConParticipantes,
		participantesSinGrupo
	} = distributeParticipantsWithPreferences(gruposConPersonal, participantes);

	return {
		grupos: gruposConParticipantes,
		usuariosSinGrupo: {
			participante: participantesSinGrupo,
			instructora: instructorasSinGrupo,
			facilitadora: facilitadorasSinGrupo,
			staff: staffSinGrupo,
			mentora: mentorasSinGrupo
		}
	};
}

module.exports = assignGroups;