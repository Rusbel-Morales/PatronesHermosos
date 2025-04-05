// sede.service.test.js
// Descripción: Pruebas unitarias para el servicio de sedes.

const SedeService = require('./sede.service');
const SedeModel = require('../../models/sede.model');
const TokenModel = require('../../models/token.model');

jest.mock('../../models/sede.model');
jest.mock('../../models/token.model');

describe('Registrar Sede', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully register a sede', async () => {
        const sede = {
            nombre_sede: "Campus Monterrey",
            convocatoria_firmada: "Sí",
            fecha_inicio: "2025-04-01",
            num_grupos_sede: 3
        };

        const mockSedeInsertResponse = { id_sede: 101 };

        // Mock DB insert
        jest.spyOn(SedeModel, 'createSede').mockResolvedValue(mockSedeInsertResponse);

        await SedeService.registrarSede(sede);

        expect(SedeModel.createSede).toHaveBeenCalledWith(sede);
    });

    test('should successfully retrieve a sede name', async () => {
        const id_sede = 101;
        const mockSedeData = { nombre_sede: "Campus Monterrey" };

        // Mock DB retrieval
        jest.spyOn(SedeModel, 'getNombreSede').mockResolvedValue(mockSedeData);

        const result = await SedeService.obtenerNombreSede(id_sede);

        expect(result).toEqual(mockSedeData);
        expect(SedeModel.getNombreSede).toHaveBeenCalledWith(id_sede);
    });

    test('should handle errors when registering a sede', async () => {
        const sede = {
            nombre_sede: "Campus Monterrey",
            convocatoria_firmada: "Sí",
            fecha_inicio: "2025-04-01",
            num_grupos_sede: 3
        };

        // Mock DB insert failure
        jest.spyOn(SedeModel, 'createSede').mockRejectedValue(new Error("Database error"));

        await expect(SedeService.registrarSede(sede))
            .rejects.toThrow("Database error");
    });

    test('should handle errors when retrieving a sede name', async () => {
        const id_sede = 101;

        // Mock DB retrieval failure
        jest.spyOn(SedeModel, 'getNombreSede').mockRejectedValue(new Error("Database error"));

        await expect(SedeService.obtenerNombreSede(id_sede))
            .rejects.toThrow("Database error");
    });
});

describe('Obtener Sedes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe devolver una lista de sedes con datos enriquecidos cuando SedeModel responde correctamente", async () => {
        const mockRawData = [
            {
                id_sede: 1,
                nombre_sede: "CDMX",
                estado: "pendiente",
                fecha_solicitud: "2025-03-20T09:00:00.000Z",
                fecha_inicio: "2025-04-01",
                coord_sede: [{ nombre: "Ana Gómez", correo: "ana@cdmx.com" }],
                participante: [{ id_participante: 101 }, { id_participante: 102 }],
                grupo: [{ id_grupo: 201 }]
            },
            {
                id_sede: 2,
                nombre_sede: "Guadalajara",
                estado: "aceptado",
                fecha_solicitud: "2025-03-21T10:30:00.000Z",
                fecha_inicio: "2025-04-02",
                coord_sede: [{ nombre: "Luis Pérez", correo: "luis@gdl.com" }],
                participante: [],
                grupo: [{ id_grupo: 202 }, { id_grupo: 203 }]
            }
        ];

        const expectedTransformed = [
            {
                id_sede: 1,
                nombre_sede: "CDMX",
                estado: "pendiente",
                fecha_solicitud: "2025-03-20T09:00:00.000Z",
                fecha_inicio: "2025-04-01",
                nombre_coord_sede: "Ana Gómez",
                correo_coord_sede: "ana@cdmx.com",
                total_participantes: 2,
                total_grupos: 1
            },
            {
                id_sede: 2,
                nombre_sede: "Guadalajara",
                estado: "aceptado",
                fecha_solicitud: "2025-03-21T10:30:00.000Z",
                fecha_inicio: "2025-04-02",
                nombre_coord_sede: "Luis Pérez",
                correo_coord_sede: "luis@gdl.com",
                total_participantes: 0,
                total_grupos: 2
            }
        ];

        SedeModel.obtenerSedes = jest.fn().mockResolvedValue(expectedTransformed);

        const result = await SedeService.obtenerSedes();

        expect(SedeModel.obtenerSedes).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedTransformed);
    });

    it("debe propagar el error si SedeModel lanza una excepción", async () => {
        const mockError = new Error("Error al obtener las sedes");

        SedeModel.obtenerSedes = jest.fn().mockRejectedValue(mockError);

        await expect(SedeService.obtenerSedes()).rejects.toThrow("Error al obtener las sedes");
        expect(SedeModel.obtenerSedes).toHaveBeenCalledTimes(1);
    });
});

describe('Aprobar y Rechazar Sede', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe aprobar la sede exitosamente', async () => {
        const idSede = 123;
        const mockResponse = { num_grupos_sede: 3 };
        const mockCoordData = { nombre: "Ana Gómez", correo: "ana@cdmx.com" };

        SedeModel.aceptarSede.mockResolvedValue(mockResponse);
        SedeModel.getCoordSedeDataByIdSede.mockResolvedValue(mockCoordData);

        await SedeService.aceptarSede(idSede);

        expect(SedeModel.aceptarSede).toHaveBeenCalledWith(idSede);
        expect(SedeModel.getCoordSedeDataByIdSede).toHaveBeenCalledWith(idSede);
    });

    test('debe manejar errores al aprobar una sede', async () => {
        const idSede = 123;
        SedeModel.aceptarSede.mockRejectedValue(new Error("Error al aprobar"));

        await expect(SedeService.aceptarSede(idSede)).rejects.toThrow("Error al aprobar");
        expect(SedeModel.aceptarSede).toHaveBeenCalledWith(idSede);
    });

    test('debe rechazar la sede exitosamente', async () => {
        const idSede = 456;
        const mockResponse = {};
        const mockCoordData = { nombre: "Luis Pérez", correo: "luis@gdl.com" };

        SedeModel.rechazarSede.mockResolvedValue(mockResponse);
        SedeModel.getCoordSedeDataByIdSede.mockResolvedValue(mockCoordData);

        await SedeService.rechazarSede(idSede);

        expect(SedeModel.rechazarSede).toHaveBeenCalledWith(idSede);
        expect(SedeModel.getCoordSedeDataByIdSede).toHaveBeenCalledWith(idSede);
    });

    test('debe manejar errores al rechazar una sede', async () => {
        const idSede = 456;
        SedeModel.rechazarSede.mockRejectedValue(new Error("Error al rechazar"));

        await expect(SedeService.rechazarSede(idSede)).rejects.toThrow("Error al rechazar");
        expect(SedeModel.rechazarSede).toHaveBeenCalledWith(idSede);
    });
});

describe('Obtener Detalles de Sedes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe devolver detalles enriquecidos de sedes correctamente', async () => {
        const mockResponse = [
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

        SedeModel.getDetallesSedes.mockResolvedValue(mockResponse);

        const result = await SedeService.obtenerDetallesSedes();

        expect(SedeModel.getDetallesSedes).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockResponse);
    });

    test('debe manejar errores al obtener detalles de sedes', async () => {
        const mockError = new Error("Error al obtener detalles de sedes");

        SedeModel.getDetallesSedes.mockRejectedValue(mockError);

        await expect(SedeService.obtenerDetallesSedes()).rejects.toThrow("Error al obtener detalles de sedes");
        expect(SedeModel.getDetallesSedes).toHaveBeenCalledTimes(1);
    });

    test('debe devolver un error si no se encuentran detalles de sedes', async () => {
        SedeModel.getDetallesSedes.mockResolvedValue([]);

        const result = await SedeService.obtenerDetallesSedes();

        expect(SedeModel.getDetallesSedes).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});

describe('Descargar Convocatoria', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully download convocatoria', async () => {
        const id = 101;
        const token = 'valid-token';
        const mockConvocatoriaPath = 'path/to/convocatoria.pdf';
        const mockConvocatoriaData = Buffer.from('PDF data');

        // Mock token verification
        jest.spyOn(TokenModel, 'verificarToken').mockResolvedValue();

        // Mock getting convocatoria path
        jest.spyOn(SedeModel, 'getConvocatoriaPathById').mockResolvedValue(mockConvocatoriaPath);

        // Mock downloading convocatoria
        jest.spyOn(SedeModel, 'descargarConvocatoria').mockResolvedValue(mockConvocatoriaData);

        const result = await SedeService.descargarConvocatoria(id, token);

        expect(TokenModel.verificarToken).toHaveBeenCalledWith(token);
        expect(SedeModel.getConvocatoriaPathById).toHaveBeenCalledWith(id);
        expect(SedeModel.descargarConvocatoria).toHaveBeenCalledWith(mockConvocatoriaPath);
        expect(result).toEqual(mockConvocatoriaData);
    });

    test('should handle errors when downloading convocatoria', async () => {
        const id = 101;
        const token = 'invalid-token';

        // Mock token verification failure
        jest.spyOn(TokenModel, 'verificarToken').mockRejectedValue(new Error('Invalid token'));

        await expect(SedeService.descargarConvocatoria(id, token))
          .rejects.toThrow('Invalid token');
    });
});