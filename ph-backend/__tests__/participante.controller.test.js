// participante.controller.test.js
// Pruebas unitarias para el controlador de participantes

const request = require("supertest");
const app = require("../src/app.js");

jest.mock("../src/services/participante.service.js");
jest.mock("../src/services/tutor.service.js");

const ParticipanteService = require("../src/services/participante.service.js");
const TutorService = require("../src/services/tutor.service.js");

describe("Participante API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should register a new participante with a tutor", async () => {
        ParticipanteService.registrarParticipante.mockResolvedValue({ id_participante: 1 });
        TutorService.registrarTutor.mockResolvedValue({});

        const requestData = {
            participante: {
                nombre: "Juan Perez",
                correo: "juan@example.com",
                edad: 15,
                escolaridad: "Secundaria",
                grado: "3ro",
                permiso_tutor: "signed_document.pdf",
                timestamp_formulario_enviado: "2025-03-16T10:00:00Z",
                timestamp_resuelto: "2025-03-16T12:00:00Z",
            },
            tutor: {
                nombre: "María López",
                correo: "maria@example.com"
            }
        };

        const response = await request(app)
            .post("/participantes/registro")
            .send(requestData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Participante y tutor registrado con éxito");
        expect(ParticipanteService.registrarParticipante).toHaveBeenCalledWith(expect.objectContaining({
            nombre: "Juan Perez",
            correo: "juan@example.com"
        }));
        expect(TutorService.registrarTutor).toHaveBeenCalledWith(expect.objectContaining({
            nombre: "María López",
            correo: "maria@example.com"
        }));
    });

    it("should not allow duplicate participante emails", async () => {
        ParticipanteService.registrarParticipante.mockRejectedValue(new Error("Email ya registrado"));

        const requestData = {
            participante: {
                nombre: "Carlos Lopez",
                correo: "carlos@example.com",
                edad: 16,
                escolaridad: "Preparatoria",
                grado: "2do",
                permiso_tutor: "signed_document.pdf",
                timestamp_formulario_enviado: "2025-03-16T11:00:00Z",
                timestamp_resuelto: "2025-03-16T13:00:00Z",
            },
            tutor: {
                nombre: "Pedro Martinez",
                correo: "pedro@example.com"
            }
        };

        const response = await request(app).post("/participantes/registro").send(requestData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Email ya registrado");
    });

    it("should return an error if required participante fields are missing", async () => {
        const incompleteData = {
            participante: {
                nombre: "Ana García",
                correo: "ana@example.com",
                edad: 17 // Missing escolaridad, grado, permiso_tutor
            },
            tutor: {
                nombre: "Luis Fernández",
                correo: "luis@example.com"
            }
        };

        const response = await request(app)
            .post("/participantes/registro")
            .send(incompleteData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Faltan datos del participante");
    });

    it("should return an error if required tutor fields are missing", async () => {
        const incompleteData = {
            participante: {
                nombre: "Andrea Torres",
                correo: "andrea@example.com",
                edad: 16,
                escolaridad: "Preparatoria",
                grado: "1ro",
                permiso_tutor: "signed_document.pdf",
                timestamp_formulario_enviado: "2025-03-16T14:00:00Z",
                timestamp_resuelto: "2025-03-16T15:00:00Z",
            },
            tutor: {
                nombre: "", // Missing required fields
                correo: ""
            }
        };

        const response = await request(app)
            .post("/participantes/registro")
            .send(incompleteData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Faltan datos del tutor");
    });

    it("should return 500 if the database insert fails", async () => {
        ParticipanteService.registrarParticipante.mockRejectedValue(new Error("Database error"));

        const requestData = {
            participante: {
                nombre: "Sofía Martínez",
                correo: "sofia@example.com",
                edad: 15,
                escolaridad: "Secundaria",
                grado: "2do",
                permiso_tutor: "signed_document.pdf",
                timestamp_formulario_enviado: "2025-03-16T16:00:00Z",
                timestamp_resuelto: "2025-03-16T17:00:00Z",
            },
            tutor: {
                nombre: "Carlos Jiménez",
                correo: "carlos@example.com"
            }
        };

        const response = await request(app).post("/participantes/registro").send(requestData);

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Database error");
    });
});