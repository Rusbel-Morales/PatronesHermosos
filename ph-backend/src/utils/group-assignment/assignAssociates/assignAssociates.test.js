const assignAssociatesWithPreferences = require("./assignAssociates");

describe("assignAssociatesWithPreferences", () => {
	const buildGrupo = (id, idioma, nivel) => ({
		id,
		idioma,
		nivel,
		cupo_max: 25,
		participantes: [],
		instructora: null,
		facilitadoras: [],
		staff: null,
		mentora: null
	});

	test("asigna correctamente instructora, 2 facilitadoras y staff a cada grupo", () => {
		const grupos = [
			buildGrupo("G1", "Español", "Básico"),
			buildGrupo("G2", "Inglés", "Avanzado")
		];

		const instructoras = [
			{ id_personal: 1, nombre: "Instructora 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Instructora" },
			{ id_personal: 2, nombre: "Instructora 2", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Instructora" }
		];

		const facilitadoras = [
			{ id_personal: 3, nombre: "Facilitadora 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 4, nombre: "Facilitadora 2", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 5, nombre: "Facilitadora 3", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Facilitadora" },
			{ id_personal: 6, nombre: "Facilitadora 4", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Facilitadora" }
		];

		const staffList = [
			{ id_personal: 7, nombre: "Staff 1", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Staff" },
			{ id_personal: 8, nombre: "Staff 2", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Staff" }
		];

		const { gruposConPersonal, personalSinGrupo } = assignAssociatesWithPreferences(
			grupos,
			instructoras,
			facilitadoras,
			staffList
		);

		expect(gruposConPersonal[0].instructora).toEqual({
			id_personal: 1,
			nombre: "Instructora 1",
			rol_preferencia: "Instructora"
		});
		expect(gruposConPersonal[0].facilitadoras).toEqual([
			{ id_personal: 3, nombre: "Facilitadora 1", rol_preferencia: "Facilitadora" },
			{ id_personal: 4, nombre: "Facilitadora 2", rol_preferencia: "Facilitadora" }
		]);
		expect(gruposConPersonal[0].staff).toEqual({
			id_personal: 7,
			nombre: "Staff 1",
			rol_preferencia: "Staff"
		});

		expect(gruposConPersonal[1].instructora).toEqual({
			id_personal: 2,
			nombre: "Instructora 2",
			rol_preferencia: "Instructora"
		});
		expect(gruposConPersonal[1].facilitadoras).toEqual([
			{ id_personal: 5, nombre: "Facilitadora 3", rol_preferencia: "Facilitadora" },
			{ id_personal: 6, nombre: "Facilitadora 4", rol_preferencia: "Facilitadora" }
		]);
		expect(gruposConPersonal[1].staff).toEqual({
			id_personal: 8,
			nombre: "Staff 2",
			rol_preferencia: "Staff"
		});

		expect(personalSinGrupo).toHaveLength(0);
	});

	test("agrega a personalSinGrupo si no hay grupo compatible", () => {
		const grupos = [
			buildGrupo("G1", "Español", "Básico")
		];

		const instructoras = [
			{ id_personal: 10, nombre: "Instructora 3", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Instructora" } // no compatible
		];

		const facilitadoras = [
			{ id_personal: 11, nombre: "Facilitadora 5", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 12, nombre: "Facilitadora 6", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Facilitadora" },
			{ id_personal: 13, nombre: "Facilitadora 7", idioma_preferencia: "Inglés", nivel_preferencia: "Avanzado", rol_preferencia: "Facilitadora" } // sin compatibilidad
		];

		const staffList = [
			{ id_personal: 14, nombre: "Staff 3", idioma_preferencia: "Español", nivel_preferencia: "Básico", rol_preferencia: "Staff" }
		];

		const { gruposConPersonal, personalSinGrupo } = assignAssociatesWithPreferences(
			grupos,
			instructoras,
			facilitadoras,
			staffList
		);

		expect(gruposConPersonal[0].instructora).toBeNull();
		expect(gruposConPersonal[0].facilitadoras).toEqual([
			{ id_personal: 11, nombre: "Facilitadora 5", rol_preferencia: "Facilitadora" },
			{ id_personal: 12, nombre: "Facilitadora 6", rol_preferencia: "Facilitadora" }
		]);
		expect(gruposConPersonal[0].staff).toEqual({
			id_personal: 14,
			nombre: "Staff 3",
			rol_preferencia: "Staff"
		});

		// El personal sin grupo debe incluir la instructora no compatible y la facilitadora extra
		expect(personalSinGrupo).toEqual([
			{ id_personal: 10, nombre: "Instructora 3", rol_preferencia: "Instructora" },
			{ id_personal: 13, nombre: "Facilitadora 7", rol_preferencia: "Facilitadora" }
		]);
	});
});