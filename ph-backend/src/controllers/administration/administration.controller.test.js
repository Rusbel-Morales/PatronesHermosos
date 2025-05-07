const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const AdministrationService = require('../../services/administration/administration.service.js');

jest.mock('../../services/administration/administration.service.js');

describe('Administration Controller', () => {
    let validToken;

    beforeAll(() => {
        validToken = jwt.sign(
            { username: 'validUser' }, 
            process.env.JWT_SECRET_KEY || 'testSecret'
        );
    });

    describe('POST /administration/login', () => {
        it('should respond with 200 OK and a token on successful login', async () => {
            const mockToken = 'mockedToken';
            const mockNombre = 'validUser';
        
            AdministrationService.verificarCredenciales.mockResolvedValue([mockNombre, mockToken]);
        
            const response = await request(app)
                .post('/administration/login')
                .send({ username: 'validUser', password: 'validPassword' });
        
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Inicio de sesión exitoso',
                token: mockToken,
                nombre: mockNombre,
            });
        });
        

        it('should respond with 400 Bad Request if data is missing', async () => {
            const response = await request(app)
                .post('/administration/login')
                .send({ username: '', password: '' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Faltan datos de la coordinadora general',
            });
        });

        it('should respond with 404 Not Found if user does not exist', async () => {
            AdministrationService.verificarCredenciales.mockRejectedValue(new Error('El usuario ingresado no existe'));

            const response = await request(app)
                .post('/administration/login')
                .send({ username: 'nonExistentUser', password: 'password' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: 'El usuario ingresado no existe',
            });
        });

        it('should respond with 401 Unauthorized if credentials are invalid', async () => {
            AdministrationService.verificarCredenciales.mockRejectedValue(new Error('Credenciales inválidas'));

            const response = await request(app)
                .post('/administration/login')
                .send({ username: 'validUser', password: 'wrongPassword' });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                error: 'Credenciales inválidas',
            });
        });
    });

    describe('PATCH /administration/logout', () => {
        it('should respond with 200 OK and a success message', async () => {
            AdministrationService.expirarToken.mockResolvedValue();

            const response = await request(app)
                .patch('/administration/logout')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Cierre de sesión exitoso',
            });
        });

        it('should respond with 500 Internal Server Error if an error occurs', async () => {
            AdministrationService.expirarToken.mockRejectedValueOnce(new Error('error is not defined'));

            const response = await request(app)
                .patch('/administration/logout')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                error: 'error is not defined',
            });
        });
    });
});