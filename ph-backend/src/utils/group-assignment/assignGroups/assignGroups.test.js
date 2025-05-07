const assignGroups = require("./assignGroups");

describe("assignGroups (integración)", () => {
	const buildGrupo = (id, idioma, nivel, cupo_max = 3) => ({
		id,
		idioma,
		nivel,
		cupo_max,
		participantes: [],
		facilitadoras: [],
		instructora: null,
		staff: null,
		mentora: null
	});

	test("asigna correctamente participantes y personal compatibles", () => {
		const grupos = [
			buildGrupo("G1", "Español", "Básico"),
			buildGrupo("G2", "Inglés", "Avanzado")
		];

		const participantes = [
			{ id_participante: 1, nombre: "Participante 1", idioma_preferencia: "Español", escolaridad: "Secundaria" }, // Básico
			{ id_participante: 2, nombre: "Participante 2", idioma_preferencia: "Inglés", escolaridad: "Preparatoria" }  // Avanzado
		];

		const instructoras = [
			{ id_personal: 10, nombre: "Instructora 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Instructora" },
			{ id_personal: 11, nombre: "Instructora 2", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Instructora" }
		];

		const facilitadoras = [
			{ id_personal: 20, nombre: "Facilitadora 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 21, nombre: "Facilitadora 2", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 22, nombre: "Facilitadora 3", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Facilitadora" },
			{ id_personal: 23, nombre: "Facilitadora 4", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Facilitadora" }
		];

		const staffList = [
			{ id_personal: 30, nombre: "Staff 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Staff" },
			{ id_personal: 31, nombre: "Staff 2", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Staff" }
		];

		const mentoras = [100, 101];

		const result = assignGroups(grupos, participantes, instructoras, facilitadoras, staffList, mentoras);

		expect(result.grupos).toHaveLength(2);

		// Grupo 1
		const g1 = result.grupos.find(g => g.id === "G1");
		expect(g1.instructora).toEqual({
			id_personal: 10,
			nombre: "Instructora 1",
			rol_preferencia: "Instructora"
		});
		expect(g1.facilitadoras).toEqual(expect.arrayContaining([
			{ id_personal: 20, nombre: "Facilitadora 1", rol_preferencia: "Facilitadora" },
			{ id_personal: 21, nombre: "Facilitadora 2", rol_preferencia: "Facilitadora" }
		]));
		expect(g1.staff).toEqual({
			id_personal: 30,
			nombre: "Staff 1",
			rol_preferencia: "Staff"
		});
		expect(g1.participantes).toContainEqual({ id_participante: 1, nombre: "Participante 1" });
		expect(g1.mentora).toBeDefined();

		// Grupo 2
		const g2 = result.grupos.find(g => g.id === "G2");
		expect(g2.instructora).toEqual({
			id_personal: 11,
			nombre: "Instructora 2",
			rol_preferencia: "Instructora"
		});
		expect(g2.facilitadoras).toEqual(expect.arrayContaining([
			{ id_personal: 22, nombre: "Facilitadora 3", rol_preferencia: "Facilitadora" },
			{ id_personal: 23, nombre: "Facilitadora 4", rol_preferencia: "Facilitadora" }
		]));
		expect(g2.staff).toEqual({
			id_personal: 31,
			nombre: "Staff 2",
			rol_preferencia: "Staff"
		});
		expect(g2.participantes).toContainEqual({ id_participante: 2, nombre: "Participante 2" });
		expect(g2.mentora).toBeDefined();

		// No debe haber nadie sin grupo
		expect(result.sinGrupo.participantes).toHaveLength(0);
		expect(result.sinGrupo.personal).toHaveLength(0);
	});

	test("agrega a sinGrupo a quienes no tienen grupo compatible", () => {
		const grupos = [buildGrupo("G1", "Español", "Básico")]; // Solo un grupo disponible

		const participantes = [
			{ id_participante: 1, nombre: "Participante 1", idioma_preferencia: "Inglés", escolaridad: "Preparatoria" } // No compatible
		];

		const instructoras = [
			{ id_personal: 10, nombre: "Instructora 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Instructora" },
			{ id_personal: 11, nombre: "Instructora 2", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Instructora" } // No compatible
		];

		const facilitadoras = [
			{ id_personal: 20, nombre: "Facilitadora 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 21, nombre: "Facilitadora 2", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 22, nombre: "Facilitadora 3", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Facilitadora" } // No compatible
		];

		const staffList = [
			{ id_personal: 30, nombre: "Staff 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Staff" }
		];

		const mentoras = [100];

		const result = assignGroups(grupos, participantes, instructoras, facilitadoras, staffList, mentoras);

		expect(result.grupos).toHaveLength(1);
		expect(result.sinGrupo.participantes).toEqual([
			{ id_participante: 1, nombre: "Participante 1" }
		]);

		expect(result.sinGrupo.personal).toEqual([
			{ id_personal: 11, nombre: "Instructora 2", rol_preferencia: "Instructora" },
			{ id_personal: 22, nombre: "Facilitadora 3", rol_preferencia: "Facilitadora" }
		]);
	});
});