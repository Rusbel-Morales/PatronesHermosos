const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const CoordGeneralService = require('../../services/coordGeneral.service');

jest.mock('../../services/coordGeneral.service');

describe('CoordGeneral Controller', () => {
    let validToken;

    beforeAll(() => {
        validToken = jwt.sign(
            { username: 'validUser' }, 
            process.env.JWT_SECRET_KEY || 'testSecret', 
            { expiresIn: '1h' }
        );
    });

    describe('POST /coordGeneral/login', () => {
        it('should respond with 200 OK and a token on successful login', async () => {
            const mockToken = 'mockedToken';
            CoordGeneralService.verificarCredenciales.mockResolvedValue(mockToken);

            const response = await request(app)
                .post('/coordGeneral/login')
                .send({ username: 'validUser', password: 'validPassword' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Inicio de sesión exitoso',
                token: mockToken,
            });
        });

        it('should respond with 400 Bad Request if data is missing', async () => {
            const response = await request(app)
                .post('/coordGeneral/login')
                .send({ username: '', password: '' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Faltan datos de la coordinadora general',
            });
        });

        it('should respond with 404 Not Found if user does not exist', async () => {
            CoordGeneralService.verificarCredenciales.mockRejectedValue(new Error('El usuario ingresado no existe'));

            const response = await request(app)
                .post('/coordGeneral/login')
                .send({ username: 'nonExistentUser', password: 'password' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: 'El usuario ingresado no existe',
            });
        });

        it('should respond with 401 Unauthorized if credentials are invalid', async () => {
            CoordGeneralService.verificarCredenciales.mockRejectedValue(new Error('Credenciales inválidas'));

            const response = await request(app)
                .post('/coordGeneral/login')
                .send({ username: 'validUser', password: 'wrongPassword' });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                error: 'Credenciales inválidas',
            });
        });
    });

    describe('PATCH /coordGeneral/logout', () => {
        it('should respond with 200 OK and a success message', async () => {
            CoordGeneralService.expirarToken.mockResolvedValue();

            const response = await request(app)
                .patch('/coordGeneral/logout')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Cierre de sesión exitoso',
            });
        });

        it('should respond with 500 Internal Server Error if an error occurs', async () => {
            CoordGeneralService.expirarToken.mockRejectedValueOnce(new Error('Unexpected error'));

            const response = await request(app)
                .patch('/coordGeneral/logout')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                error: 'Unexpected error',
            });
        });
    });
});