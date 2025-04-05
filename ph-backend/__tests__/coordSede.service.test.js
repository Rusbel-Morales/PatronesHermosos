const CoordSedeService = require('../src/services/coordSede.service');
const CoordSedeModel = require('../src/models/coordSede.model');
const Mailer = require('../config/mailer/Mailer');

jest.mock('../src/models/coordSede.model');
jest.mock('../config/mailer/Mailer');

describe('CoordSedeService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully register a coordSede and send a confirmation email', async () => {
        const coordSedeData = {
            nombre: "Ana López",
            correo: "ana@example.com",
            telefono: "555-1234",
            password: "securePass123",
            id_sede: 101
        };

        // Mock DB insert
        jest.spyOn(CoordSedeModel, 'createCoordSede').mockResolvedValue();

        // Mock email sending
        jest.spyOn(Mailer, 'enviarCorreoConfirmacion').mockResolvedValue();

        await CoordSedeService.registrarCoordSede(coordSedeData);

        expect(CoordSedeModel.createCoordSede).toHaveBeenCalledWith(coordSedeData);
        expect(Mailer.enviarCorreoConfirmacion).toHaveBeenCalledWith(
            coordSedeData.nombre,
            coordSedeData.correo,
            "Tu registro de sede y coordinadora de sede ha sido exitoso"
        );
    });

    test('should handle errors when coordSede registration fails', async () => {
        const coordSedeData = {
            nombre: "Ana López",
            correo: "ana@example.com",
            telefono: "555-1234",
            password: "securePass123",
            id_sede: 101
        };

        // Mock DB insert failure
        jest.spyOn(CoordSedeModel, 'createCoordSede').mockRejectedValue(new Error("Database error"));

        await expect(CoordSedeService.registrarCoordSede(coordSedeData))
            .rejects.toThrow("Database error");

        expect(Mailer.enviarCorreoConfirmacion).not.toHaveBeenCalled();
    });
});