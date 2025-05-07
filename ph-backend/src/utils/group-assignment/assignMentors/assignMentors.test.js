const assignMentors = require('./assignMentors');

describe('assignMentors', () => {
	const buildGrupos = (n) =>
		Array.from({ length: n }, (_, i) => ({
			id: `G${i + 1}`,
			mentora: null,
		}));

	test('assigns one mentor per every two groups', () => {
		const grupos = buildGrupos(4);
		const mentoras = [301, 302]; // last in = first out

		assignMentors(grupos, [...mentoras]);

		expect(grupos[0].mentora).toBe(302);
		expect(grupos[1].mentora).toBe(302);
		expect(grupos[2].mentora).toBe(301);
		expect(grupos[3].mentora).toBe(301);
	});

	test('handles odd number of groups (last group gets a mentor alone)', () => {
		const grupos = buildGrupos(5);
		const mentoras = [401, 402, 403];

		assignMentors(grupos, [...mentoras]);

		expect(grupos[0].mentora).toBe(403);
		expect(grupos[1].mentora).toBe(403);
		expect(grupos[2].mentora).toBe(402);
		expect(grupos[3].mentora).toBe(402);
		expect(grupos[4].mentora).toBe(401); // sola
	});

	test('assigns unique mentors to each pair', () => {
		const grupos = buildGrupos(6);
		const mentoras = [10, 20, 30];

		assignMentors(grupos, [...mentoras]);

		expect(grupos[0].mentora).toBe(30);
		expect(grupos[1].mentora).toBe(30);
		expect(grupos[2].mentora).toBe(20);
		expect(grupos[3].mentora).toBe(20);
		expect(grupos[4].mentora).toBe(10);
		expect(grupos[5].mentora).toBe(10);
	});

	test('does not throw with 1 group and 1 mentor', () => {
		const grupos = buildGrupos(1);
		const mentoras = [999];

		expect(() => assignMentors(grupos, [...mentoras])).not.toThrow();
		expect(grupos[0].mentora).toBe(999);
	});

	test('leaves original mentor array shorter by ceil(grupos.length / 2)', () => {
		const grupos = buildGrupos(3);
		const mentoras = [1, 2];

		const clone = [...mentoras];
		assignMentors(grupos, clone);

		expect(clone.length).toBe(0);
	});
});