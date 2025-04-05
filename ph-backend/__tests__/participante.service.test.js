const ParticipanteService = require('../src/services/participante.service');
const ParticipanteModel = require('../src/models/participante.model');
const Mailer = require('../config/mailer/Mailer');

jest.mock('../src/models/participante.model');
jest.mock('../config/mailer/Mailer');

describe('ParticipanteService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should register a participant and send a confirmation email', async () => {
        const participante = {
            nombre: "Juan Pérez",
            correo: "juan@example.com",
            telefono: "1234567890"
        };

        jest.spyOn(ParticipanteModel, 'createParticipante').mockResolvedValue();
        jest.spyOn(Mailer, 'enviarCorreoConfirmacion').mockResolvedValue();

        await ParticipanteService.registrarParticipante(participante);

        expect(ParticipanteModel.createParticipante).toHaveBeenCalledWith(participante);
        expect(Mailer.enviarCorreoConfirmacion).toHaveBeenCalledWith(
            participante.nombre,
            participante.correo,
            "Tu registro como participante ha sido exitoso"
        );
    });

    test('should handle errors when registering a participant', async () => {
        const participante = {
            nombre: "Juan Pérez",
            correo: "juan@example.com",
            telefono: "1234567890"
        };

        jest.spyOn(ParticipanteModel, 'createParticipante').mockRejectedValue(new Error("Database error"));

        await expect(ParticipanteService.registrarParticipante(participante))
            .rejects.toThrow("Database error");

        expect(Mailer.enviarCorreoConfirmacion).not.toHaveBeenCalled();
    });

    test('should upload a permission file correctly', async () => {
        const nombre_sede_transformado = "campus-monterrey";
        const name_file_pdf = "permiso_juan_perez.pdf";
        const file_pdf = Buffer.from("fake-pdf-content");

        jest.spyOn(ParticipanteModel, 'subirPermiso').mockResolvedValue("Archivo subido correctamente");

        const result = await ParticipanteService.enviarPermiso(nombre_sede_transformado, name_file_pdf, file_pdf);

        expect(result).toBe("Archivo subido correctamente");
        expect(ParticipanteModel.subirPermiso).toHaveBeenCalledWith(
            nombre_sede_transformado,
            name_file_pdf,
            file_pdf
        );
    });

    test('should handle errors when uploading a permission file', async () => {
        const nombre_sede_transformado = "campus-monterrey";
        const name_file_pdf = "permiso_juan_perez.pdf";
        const file_pdf = Buffer.from("fake-pdf-content");

        jest.spyOn(ParticipanteModel, 'subirPermiso').mockRejectedValue(new Error("Error al subir el archivo"));

        await expect(ParticipanteService.enviarPermiso(nombre_sede_transformado, name_file_pdf, file_pdf))
            .rejects.toThrow("Error al subir el archivo");
    });
});