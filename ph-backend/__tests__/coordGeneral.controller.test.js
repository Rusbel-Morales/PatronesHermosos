// coordGeneral.controller.test.js
const CoordGeneralController = require('../src/controllers/coordGeneral.controller');
const CoordGeneralService = require('../src/services/coordGeneral.service');

jest.mock('../src/services/coordGeneral.service');

describe('CoordGeneralController', () => {
	describe('login', () => {
		let req, res;

		beforeEach(() => {
			req = {
				body: {
					username: 'testuser',
					password: 'testpassword'
				}
			};
			res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
		});

		it('should return 200 and token on successful login', async () => {
			const token = 'testtoken';
			CoordGeneralService.verificarCredenciales.mockResolvedValue(token);

			await CoordGeneralController.login(req, res);

			expect(CoordGeneralService.verificarCredenciales).toHaveBeenCalledWith('testuser', 'testpassword');
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({ message: 'Inicio de sesión exitoso', token });
		});

		it('should return 404 if user does not exist', async () => {
			CoordGeneralService.verificarCredenciales.mockRejectedValue(new Error('El usuario ingresado no existe'));

			await CoordGeneralController.login(req, res);

			expect(CoordGeneralService.verificarCredenciales).toHaveBeenCalledWith('testuser', 'testpassword');
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ error: 'El usuario ingresado no existe' });
		});

		it('should return 401 if credentials are invalid', async () => {
			CoordGeneralService.verificarCredenciales.mockRejectedValue(new Error('Credenciales inválidas'));

			await CoordGeneralController.login(req, res);

			expect(CoordGeneralService.verificarCredenciales).toHaveBeenCalledWith('testuser', 'testpassword');
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
		});

		it('should return 500 on server error', async () => {
			CoordGeneralService.verificarCredenciales.mockRejectedValue(new Error('Server error'));

			await CoordGeneralController.login(req, res);

			expect(CoordGeneralService.verificarCredenciales).toHaveBeenCalledWith('testuser', 'testpassword');
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
		});
	});
});