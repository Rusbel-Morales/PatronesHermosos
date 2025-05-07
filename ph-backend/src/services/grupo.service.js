const GrupoModel = require("../models/grupo.model.js");
const ParticipanteModel = require("../models/participante.model.js");
const MentoraModel = require("../models/mentora.model.js");
const PersonalModel = require("../models/personal.model.js");
const PersonalService = require("./personal.service.js");
const splitPersonal = require("../utils/splitPersonal.js");
const ParticipanteService = require("./participante.service.js");
const assignGroups = require("../utils/group-assignment/assignGroups/assignGroups.js")

const GrupoService = {
	async registrarGrupos(grupos, id_sede) {
		grupos = grupos.map(g => ({...g, id_sede }));
		return await GrupoModel.createGrupo(grupos);
	},
	async obtenerGruposSede(id_sede) {

		// Obtener los grupos de la sede
		let [gruposConDatos, participantesSinGrupos, colaboradorasSinGrupo, mentorasSinGrupo] = await Promise.all([
			GrupoModel.getGruposSedes(id_sede),
			ParticipanteModel.getParticipantesSinGrupo(id_sede),
			PersonalModel.getPersonalSinGrupo(id_sede),
			MentoraModel.getMentorasSinGrupo(id_sede)
		]);

		// Determinar el nivel a la que pertenece cada participante
		participantesSinGrupos = participantesSinGrupos.map(({ escolaridad, ...rest }) => ({
			...rest,
			nivel: escolaridad === "Preparatoria" ? "Avanzado" : "Básico"
		}));

		// Obtener el personal dividido por rol
		const { instructora, facilitadora, staff } = splitPersonal(colaboradorasSinGrupo);

		return {
			grupos: gruposConDatos,
			usuariosSinGrupo: {
				participante: participantesSinGrupos,
				instructora,
				facilitadora,
				staff,
				mentora: mentorasSinGrupo
			}
		};
	},
	async actualizarGrupos(grupos) {
		const ACTIONS = {
			participante: ParticipanteService.updateParticipanteReference,
			mentora: GrupoService.updateMentoraReferenceInGroup,
			personal: PersonalService.updatePersonalReference
		};
		let promises = [];

		for (const grupo of grupos) {
			const { id_grupo } = grupo;
			const datosGrupo = Object.entries(grupo).slice(1, 4);

			// Actualizar metadatos de los grupos
			promises.push(GrupoModel.updateGrupo(id_grupo, Object.fromEntries(datosGrupo)));

			// Actualizar los participantes y personal asignados a los grupos
			const { inscritos } = grupo;

			// Crear un array de promesas para ejecutar todas las claves al mismo tiempo
			Object.keys(inscritos).forEach(key => {
				const action = ACTIONS[key] || ACTIONS.personal;
				if (action) {
					const ids = inscritos[key].map(inscrito => inscrito.id_personal || inscrito.id_participante || inscrito.id_mentora);
					promises.push(action(ids, id_grupo));
				}
			});
		}

		// Ejecutar todas las promesas después de iterar
		await Promise.all(promises);
	},
	async generarGruposAutomaticos(id_sede) {
		// Obtener los datos de grupos, participantes, colaboras y mentoras
		const [grupos, participantes, colaboradoras, mentoras] = await Promise.all([
			GrupoModel.getGruposCreados(id_sede),
			ParticipanteModel.getParticipantesPorSede(id_sede),
			PersonalModel.getPersonalBySede(id_sede),
			MentoraModel.getMentorasBySede(id_sede)
		]);

		// Obtener el personal dividido por rol
		const { instructora, facilitadora, staff } = splitPersonal(colaboradoras);

		// Generar grupos automaticamente
		return assignGroups(grupos, participantes, instructora, facilitadora, staff, mentoras);
	},
	async eliminarGrupos(grupos) {
		const promises = grupos.map(async id_grupo => await GrupoModel.deleteGrupo(id_grupo));

		await Promise.all(promises);
	},
	async updateMentoraReferenceInGroup([id_mentora], id_grupo) {		
		await GrupoModel.updateMentoraReferenceInGroup(id_mentora, id_grupo);
	},
	async updateMentoraReferenceOutGroup(mentora) {
		mentora.forEach(async id_mentora => {
			await GrupoModel.updatePersonalReferenceOutGroup(id_mentora, null);
		});
	},
	async actualizarReferenciasUsuariosSinGrupo(usuariosSinGrupo) {
		if (Object.keys(usuariosSinGrupo).length > 0) {
			const { participante, instructora, facilitadora, staff, mentora } = usuariosSinGrupo;

			const allPersonal = [
				...(instructora || []),
				...(facilitadora || []),
				...(staff || [])
			];

			const promises = [
				participante && ParticipanteService.updateParticipanteReference(participante.map(p => p.id_participante)),
				mentora && this.updateMentoraReferenceOutGroup(mentora.map(m => m.id_mentora)),
				allPersonal.length > 0 && PersonalService.updatePersonalReference(allPersonal.map(per => per.id_personal))
			];

			await Promise.all(promises);
		}
	}
}

module.exports = GrupoService;