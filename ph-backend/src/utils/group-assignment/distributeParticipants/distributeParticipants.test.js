const distributeParticipantsWithPreferences = require("./distributeParticipants");

// Mock de las funciones auxiliares
jest.mock("../getNivelFromEscolaridad/getNivelFromEscolaridad", () => jest.fn());
jest.mock("../findCompatibleGroups/findCompatibleGroups", () => jest.fn());
jest.mock("../hasCupoDisponible/hasCupoDisponible", () => jest.fn());

const getNivelFromEscolaridad = require("../getNivelFromEscolaridad/getNivelFromEscolaridad");
const findCompatibleGroups = require("../findCompatibleGroups/findCompatibleGroups");
const hasCupoDisponible = require("../hasCupoDisponible/hasCupoDisponible");

describe("distributeParticipantsWithPreferences (Round Robin)", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("asigna participantes en Round Robin entre grupos compatibles", () => {
		const participantes = [
			{ id_participante: 1, nombre: "Participante 1", idioma_preferencia: "Español", escolaridad: "Secundaria" },
			{ id_participante: 2, nombre: "Participante 2", idioma_preferencia: "Español", escolaridad: "Secundaria" },
			{ id_participante: 3, nombre: "Participante 3", idioma_preferencia: "Español", escolaridad: "Secundaria" },
			{ id_participante: 4, nombre: "Participante 4", idioma_preferencia: "Español", escolaridad: "Secundaria" }
		];

		const grupo1 = { id: "G1", participantes: [], cupo_max: 25 };
		const grupo2 = { id: "G2", participantes: [], cupo_max: 25 };

		getNivelFromEscolaridad.mockReturnValue("Básico");
		findCompatibleGroups.mockReturnValue([grupo1, grupo2]);
		hasCupoDisponible.mockImplementation(grupo => true); // Ambos siempre tienen espacio

		const { gruposConParticipantes, participantesSinGrupo } =
			distributeParticipantsWithPreferences([grupo1, grupo2], participantes);

		// Esperamos rotación:
		// 1 → G1
		// 2 → G2
		// 3 → G1
		// 4 → G2
		expect(gruposConParticipantes[0].participantes).toEqual([
			{ id_participante: 1, nombre: "Participante 1" },
			{ id_participante: 3, nombre: "Participante 3" }
		]);
		expect(gruposConParticipantes[1].participantes).toEqual([
			{ id_participante: 2, nombre: "Participante 2" },
			{ id_participante: 4, nombre: "Participante 4" }
		]);

		expect(participantesSinGrupo).toHaveLength(0);
	});

	test("si ningún grupo tiene cupo, se envía a participantesSinGrupo", () => {
		const participante = { 
			id_participante: 5, 
			nombre: "Participante 5", 
			idioma_preferencia: "Inglés", 
			escolaridad: "Preparatoria" 
		};
		const grupoMock = { id: "G3", participantes: [], cupo_max: 3 };

		getNivelFromEscolaridad.mockReturnValue("Avanzado");
		findCompatibleGroups.mockReturnValue([grupoMock]);
		hasCupoDisponible.mockReturnValue(false);

		const { gruposConParticipantes, participantesSinGrupo } =
			distributeParticipantsWithPreferences([grupoMock], [participante]);

		expect(gruposConParticipantes[0].participantes).not.toContainEqual({ id_participante: 5, nombre: "Participante 5" });
		expect(participantesSinGrupo).toEqual([{ id_participante: 5, nombre: "Participante 5" }]);
	});

	test("si no hay grupos compatibles, también se va a participantesSinGrupo", () => {
		const participante = { 
			id_participante: 6, 
			nombre: "Participante 6", 
			idioma_preferencia: "Español", 
			escolaridad: "Preparatoria" 
		};

		getNivelFromEscolaridad.mockReturnValue("Avanzado");
		findCompatibleGroups.mockReturnValue([]);
		// hasCupoDisponible no se debe llamar en este caso

		const { participantesSinGrupo } = distributeParticipantsWithPreferences([], [participante]);

		expect(findCompatibleGroups).toHaveBeenCalledWith([], "Español", "Avanzado");
		expect(hasCupoDisponible).not.toHaveBeenCalled();
		expect(participantesSinGrupo).toEqual([{ id_participante: 6, nombre: "Participante 6" }]);
	});
});