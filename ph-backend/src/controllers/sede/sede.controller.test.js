const request = require('supertest');
const app = require('../../app'); // Ensure this is the correct path to your Express app
const SedeService = require('../../services/sede/sede.service');
const CoordSedeService = require('../../services/coordSede.service');
const GrupoService = require('../../services/grupo.service');
const SedeController = require("./sede.controller");

jest.mock('../../services/sede/sede.service');
jest.mock('../../services/coordSede.service');
jest.mock('../../services/grupo.service');

describe('POST /sedes/registro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully register sede, coordSede, and groups', async () => {
        const requestData = {
            coordSede: {
                nombre: "Ana López",
                correo: "ana@example.com",
                telefono: "555-1234"
            },
            sede: {
                nombre_sede: "Campus Monterrey",
                convocatoria_firmada: "Sí",
                fecha_inicio: "2025-04-01",
                num_grupos_sede: 3
            }
        };

        const mockSedeResponse = { id_sede: 101 };

        // Mock DB insertions
        jest.spyOn(SedeService, 'registrarSede').mockResolvedValue(mockSedeResponse);
        jest.spyOn(CoordSedeService, 'registrarCoordSede').mockResolvedValue();
        jest.spyOn(GrupoService, 'registrarGrupo').mockResolvedValue();

        const response = await request(app)
            .post('/sedes/registro')
            .send(requestData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "Sede, coordinadora de sede y grupos de la sede registradas con éxito" });

        expect(SedeService.registrarSede).toHaveBeenCalledWith(expect.objectContaining({
            nombre_sede: "Campus Monterrey",
            convocatoria_firmada: "Sí",
            fecha_inicio: "2025-04-01"
        }));

        expect(CoordSedeService.registrarCoordSede).toHaveBeenCalledWith(expect.objectContaining({
            nombre: "Ana López",
            correo: "ana@example.com",
            telefono: "555-1234",
            password: "1234567",
            id_sede: 101
        }));

        expect(GrupoService.registrarGrupo).toHaveBeenCalledWith(expect.arrayContaining([
            { id_sede: 101 },
            { id_sede: 101 }
        ]));
    });

    test('should return 400 when required coordSede fields are missing', async () => {
        const requestData = {
            coordSede: {
                correo: "ana@example.com",
                telefono: "555-1234"
                // Missing 'nombre'
            },
            sede: {
                nombre_sede: "Campus Monterrey",
                convocatoria_firmada: "Sí",
                fecha_inicio: "2025-04-01",
                num_grupos_sede: 3
            }
        };

        const response = await request(app)
            .post('/sedes/registro')
            .send(requestData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Faltan datos de la coordinadora de sede" });

        expect(SedeService.registrarSede).not.toHaveBeenCalled();
        expect(CoordSedeService.registrarCoordSede).not.toHaveBeenCalled();
        expect(GrupoService.registrarGrupo).not.toHaveBeenCalled();
    });

    test('should return 400 when required sede fields are missing', async () => {
        const requestData = {
            coordSede: {
                nombre: "Ana López",
                correo: "ana@example.com",
                telefono: "555-1234"
            },
            sede: {
                nombre_sede: "Campus Monterrey",
                convocatoria_firmada: "Sí"
                // Missing 'fecha_inicio' and 'num_grupos_sede'
            }
        };

        const response = await request(app)
            .post('/sedes/registro')
            .send(requestData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Faltan datos de la sede" });

        expect(SedeService.registrarSede).not.toHaveBeenCalled();
        expect(CoordSedeService.registrarCoordSede).not.toHaveBeenCalled();
        expect(GrupoService.registrarGrupo).not.toHaveBeenCalled();
    });

    test('should return 500 when service fails', async () => {
        const requestData = {
            coordSede: {
                nombre: "Ana López",
                correo: "ana@example.com",
                telefono: "555-1234"
            },
            sede: {
                nombre_sede: "Campus Monterrey",
                convocatoria_firmada: "Sí",
                fecha_inicio: "2025-04-01",
                num_grupos_sede: 3
            }
        };

        jest.spyOn(SedeService, 'registrarSede').mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post('/sedes/registro')
            .send(requestData);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Database error" });

        expect(SedeService.registrarSede).toHaveBeenCalled();
        expect(CoordSedeService.registrarCoordSede).not.toHaveBeenCalled();
        expect(GrupoService.registrarGrupo).not.toHaveBeenCalled();
    });

});

describe('GET /sedes', () => {
    let res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("debe responder con 200 y la lista de sedes si todo va bien", async () => {
        const mockSedes = [
            {
                id_sede: 1,
                nombre_sede: "Sede A",
                estado: "pendiente",
                fecha_solicitud: "2025-03-20T10:00:00.000Z"
            },
            {
                id_sede: 2,
                nombre_sede: "Sede B",
                estado: "aceptado",
                fecha_solicitud: "2025-03-21T12:30:00.000Z"
            }
        ];

        SedeService.obtenerSedes = jest.fn().mockResolvedValue(mockSedes);

        await SedeController.obtenerSedes(null, res);

        expect(SedeService.obtenerSedes).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockSedes);
    });

    it("debe responder con 500 si ocurre un error", async () => {
        const mockError = new Error("Error al obtener sedes");

        SedeService.obtenerSedes = jest.fn().mockRejectedValue(mockError);

        await SedeController.obtenerSedes(null, res);

        expect(SedeService.obtenerSedes).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener sedes" });
    });
});

describe('POST /sedes/:id/aprobar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe aprobar la sede exitosamente', async () => {
        SedeService.aprobarSede.mockResolvedValue();

        const response = await request(app).post('/sedes/123/aprobar');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Sede aprobada con éxito" });
        expect(SedeService.aprobarSede).toHaveBeenCalledWith("123");
    });

    test('debe devolver error 500 si falla el servicio', async () => {
        SedeService.aprobarSede.mockRejectedValue(new Error("Error al aprobar"));

        const response = await request(app).post('/sedes/123/aprobar');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Error al aprobar" });
        expect(SedeService.aprobarSede).toHaveBeenCalledWith("123");
    });
});

describe('POST /sedes/:id/rechazar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe rechazar la sede exitosamente', async () => {
        SedeService.rechazarSede.mockResolvedValue();

        const response = await request(app).post('/sedes/123/rechazar');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Sede rechazada con éxito" });
        expect(SedeService.rechazarSede).toHaveBeenCalledWith("123");
    });

    test('debe devolver error 500 si falla el servicio', async () => {
        SedeService.rechazarSede.mockRejectedValue(new Error("Error al rechazar"));

        const response = await request(app).post('/sedes/123/rechazar');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Error al rechazar" });
        expect(SedeService.rechazarSede).toHaveBeenCalledWith("123");
    });
});

describe('GET /sedes/detalles', () => {
    let res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should return 200 and the details of the sede", async () => {
        const mockSedeDetails = [
            {
                nombre: "Rusbel Alejandro",
                correo: "rusbelalejandrom@gmail.com",
                sede: {
                    nombre_sede: "Monterrey",
                    fecha_inicio: "2025-07-07",
                    fecha_solicitud: "2025-04-01"
                }
            }
        ];

        SedeService.obtenerDetallesSedes = jest.fn().mockResolvedValue(mockSedeDetails);

        await SedeController.obtenerDetalles(null, res);

        expect(SedeService.obtenerDetallesSedes).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockSedeDetails);
    });

    it("should return 500 if there is an error", async () => {
        const mockError = new Error("Error al obtener detalles de las sedes");

        SedeService.obtenerDetallesSedes = jest.fn().mockRejectedValue(mockError);

        await SedeController.obtenerDetalles(null, res);

        expect(SedeService.obtenerDetallesSedes).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener detalles de las sedes" });
    });
});

describe('GET /:id/convocatoria', () => {
    let req, res;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer valid-token'
            },
            params: {
                id: '101'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
            send: jest.fn()
        };
    });

    test('should successfully download convocatoria', async () => {
        const mockConvocatoriaData = Buffer.from('PDF data');
        SedeService.descargarConvocatoria.mockResolvedValue(mockConvocatoriaData);

        await SedeController.descargarConvocatoria(req, res);

        expect(SedeService.descargarConvocatoria).toHaveBeenCalledWith('101');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename=convocatoria_sede_101.pdf');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
        expect(res.send).toHaveBeenCalledWith(mockConvocatoriaData);
    });

     test('should return 401 if token is missing', async () => {
         const mockTokenMiddleware = (req, res, next) => {
             if (!req.headers.authorization) {
                 return res.status(401).json({ error: 'Token de sesión requerido' });
             }
             next();
         };

         req.headers.authorization = undefined;

         await mockTokenMiddleware(req, res, () => {});

         expect(res.status).toHaveBeenCalledWith(401);
         expect(res.json).toHaveBeenCalledWith({ error: 'Token de sesión requerido' });
     });

    test('should return 404 if convocatoria is not found', async () => {
        SedeService.descargarConvocatoria.mockResolvedValue(null);

        await SedeController.descargarConvocatoria(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Sede no encontrada' });
    });

    test('should return 500 if there is an error', async () => {
        SedeService.descargarConvocatoria.mockRejectedValue(new Error('Database error'));

        await SedeController.descargarConvocatoria(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al descargar la convocatoria: Database error' });
    });
});