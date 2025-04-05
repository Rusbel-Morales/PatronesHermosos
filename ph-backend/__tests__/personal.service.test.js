const PersonalService = require('../src/services/personal.service');
const PersonalModel = require('../src/models/personal.model');
const Mailer = require('../config/mailer/Mailer');

jest.mock('../src/models/personal.model');
jest.mock('../config/mailer/Mailer');

describe('PersonalService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully register personal and send a confirmation email', async () => {
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

        // Mock DB insert
        jest.spyOn(PersonalModel, 'createPersonal').mockResolvedValue();

        // Mock email sending
        jest.spyOn(Mailer, 'enviarCorreoConfirmacion').mockResolvedValue();

        await PersonalService.registrarPersonal(personal);

        expect(PersonalModel.createPersonal).toHaveBeenCalledWith(personal);
        expect(Mailer.enviarCorreoConfirmacion).toHaveBeenCalledWith(
            personal.nombre,
            personal.correo,
            "Tu registro como colaboradora ha sido exitoso"
        );
    });

    test('should handle errors when personal registration fails', async () => {
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

        // Mock DB insert failure
        jest.spyOn(PersonalModel, 'createPersonal').mockRejectedValue(new Error("Database error"));

        await expect(PersonalService.registrarPersonal(personal))
            .rejects.toThrow("Database error");

        expect(Mailer.enviarCorreoConfirmacion).not.toHaveBeenCalled();
    });
});