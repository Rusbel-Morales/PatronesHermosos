const request = require('supertest');
const app = require('../src/app'); // Ensure this is the correct path to your Express app
const PersonalService = require('../src/services/personal.service');

jest.mock('../src/services/personal.service');

describe('POST /personal/registro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 201 when personal is successfully registered', async () => {
        const personal = {
            nombre: "Laura Gómez",
            correo: "laura@example.com",
            universidad_origen: "Tec de Monterrey",
            sede_participacion: "Campus Monterrey",
            carrera: "Ingeniería en Sistemas",
            idioma_preferencia: "Español",
            nivel_preferencia: "Avanzado",
            rol_preferencia: "Mentora"
        };

        // Mock successful service call
        jest.spyOn(PersonalService, 'registrarPersonal').mockResolvedValue();

        const response = await request(app)
            .post('/personal/registro')
            .send(personal);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "Personal registrada con éxito" });

        expect(PersonalService.registrarPersonal).toHaveBeenCalledWith(personal);
    });

    test('should return 400 when required fields are missing', async () => {
        const incompletePersonal = {
            nombre: "Laura Gómez",
            correo: "laura@example.com",
            universidad_origen: "Tec de Monterrey"
            // Missing fields: sede_participacion, carrera, idioma_preferencia, nivel_preferencia, rol_preferencia
        };

        const response = await request(app)
            .post('/personal/registro')
            .send(incompletePersonal);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Faltan datos del Personal/Alumna" });

        expect(PersonalService.registrarPersonal).not.toHaveBeenCalled();
    });

    test('should return 500 when service fails', async () => {
        const personal = {
            nombre: "Laura Gómez",
            correo: "laura@example.com",
            universidad_origen: "Tec de Monterrey",
            sede_participacion: "Campus Monterrey",
            carrera: "Ingeniería en Sistemas",
            idioma_preferencia: "Español",
            nivel_preferencia: "Avanzado",
            rol_preferencia: "Mentora"
        };

        // Mock service failure
        jest.spyOn(PersonalService, 'registrarPersonal').mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post('/personal/registro')
            .send(personal);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Database error" });

        expect(PersonalService.registrarPersonal).toHaveBeenCalledWith(personal);
    });
});