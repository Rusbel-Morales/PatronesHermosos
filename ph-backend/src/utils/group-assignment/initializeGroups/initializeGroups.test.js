const initializeGroups = require('./initializeGroups');

describe('initializeGroups', () => {
	test('adds all required fields to each group', () => {
		const rawGrupos = [
			{ id: 'G1', cupo: 25 },
			{ id: 'G2', cupo: 30 }
		];

		const grupos = initializeGroups(rawGrupos);

		for (const grupo of grupos) {
			expect(grupo).toHaveProperty('id');
			expect(grupo).toHaveProperty('cupo');
			expect(grupo).toHaveProperty('participantes');
			expect(grupo).toHaveProperty('instructora');
			expect(grupo).toHaveProperty('facilitadoras');
			expect(grupo).toHaveProperty('staff');
			expect(grupo).toHaveProperty('mentora');

			expect(Array.isArray(grupo.participantes)).toBe(true);
			expect(grupo.participantes).toEqual([]);

			expect(Array.isArray(grupo.facilitadoras)).toBe(true);
			expect(grupo.facilitadoras).toEqual([]);

			expect(grupo.instructora).toBeNull();
			expect(grupo.staff).toBeNull();
			expect(grupo.mentora).toBeNull();
		}
	});

	test('preserves original id and cupo values', () => {
		const rawGrupos = [
			{ id: 'A', cupo: 10 },
			{ id: 'B', cupo: 20 }
		];

		const grupos = initializeGroups(rawGrupos);
		expect(grupos[0].id).toBe('A');
		expect(grupos[0].cupo).toBe(10);
		expect(grupos[1].id).toBe('B');
		expect(grupos[1].cupo).toBe(20);
	});

	test('does not mutate the original array', () => {
		const original = [
			{ id: 'G1', cupo: 25 },
			{ id: 'G2', cupo: 25 }
		];

		const originalCopy = JSON.stringify(original);
		initializeGroups(original);

		expect(JSON.stringify(original)).toBe(originalCopy); // no mutation
	});

	test('returns an empty array when given an empty list', () => {
		expect(initializeGroups([])).toEqual([]);
	});
});