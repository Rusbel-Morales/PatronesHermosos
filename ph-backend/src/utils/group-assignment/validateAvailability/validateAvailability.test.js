const validateAvailability = require('./validateAvailability');

describe('validateAvailability', () => {
	const mockGrupos = (n) => Array.from({ length: n }, (_, i) => ({ id: `G${i + 1}`, cupo: 25 }));

	test('does not throw if all roles are sufficiently available', () => {
		const grupos = mockGrupos(4);
		const instructoras = [1, 2, 3, 4];
		const facilitadoras = [10, 11, 12, 13, 14, 15, 16, 17];
		const staffList = [20, 21, 22, 23];
		const mentoras = [30, 31];

		expect(() =>
			validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras)
		).not.toThrow();
	});

	test('throws if not enough instructoras', () => {
		const grupos = mockGrupos(3);
		const instructoras = [1, 2]; // one missing
		const facilitadoras = [10, 11, 12, 13, 14, 15];
		const staffList = [20, 21, 22];
		const mentoras = [30, 31];

		expect(() =>
			validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras)
		).toThrow("No hay suficientes personas para cubrir todos los roles.");
	});

	test('throws if not enough facilitadoras (needs 2 per group)', () => {
		const grupos = mockGrupos(3);
		const instructoras = [1, 2, 3];
		const facilitadoras = [10, 11, 12, 13, 14]; // needs 6
		const staffList = [20, 21, 22];
		const mentoras = [30, 31];

		expect(() =>
			validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras)
		).toThrow("No hay suficientes personas para cubrir todos los roles.");
	});

	test('throws if not enough staff', () => {
		const grupos = mockGrupos(2);
		const instructoras = [1, 2];
		const facilitadoras = [10, 11, 12, 13];
		const staffList = [20]; // one missing
		const mentoras = [30];

		expect(() =>
			validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras)
		).toThrow("No hay suficientes personas para cubrir todos los roles.");
	});

	test('throws if not enough mentoras for odd number of groups (needs ceil(n/2))', () => {
		const grupos = mockGrupos(5); // needs 3 mentoras
		const instructoras = [1, 2, 3, 4, 5];
		const facilitadoras = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		const staffList = [20, 21, 22, 23, 24];
		const mentoras = [30, 31]; // one missing

		expect(() =>
			validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras)
		).toThrow("No hay suficientes personas para cubrir todos los roles.");
	});

	test('does not throw when exactly the minimum required for 1 group', () => {
		const grupos = mockGrupos(1);
		const instructoras = [1];
		const facilitadoras = [10, 11];
		const staffList = [20];
		const mentoras = [30];

		expect(() =>
			validateAvailability(grupos, instructoras, facilitadoras, staffList, mentoras)
		).not.toThrow();
	});
});