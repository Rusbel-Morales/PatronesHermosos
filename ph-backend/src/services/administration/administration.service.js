const AdministrationModel = require("../../models/administration.model.js");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../../utils/jwtGenerate.js");
const SedeModel = require("../../models/sede.model.js");
const Papa = require("papaparse");

const AdministrationService = {
    async verificarCredenciales(username, password) {
        let userData;
        const rolList = [
            { rol: "coord_general", id: "id_coord_general", tokenTable: "token_coord_general" }, 
            { rol: "coord_sede", id: "id_coord_sede", tokenTable: "token_coord_sede" }
        ];

        // Obtener los datos del usuario
        for (const { rol, id, tokenTable } of rolList) {
            userData = await AdministrationModel.getNameAndPassword(username, rol, id);
            if (userData) {
                userData.tokenTable = tokenTable;
                break;
            }
        }

        // Si no se encontró el usuario en ninguna de las tablas, se lanza un error
        if (!userData) {
            throw new Error("El usuario ingresado no existe");
        }

        // Si se encontró el usuario, se verifica la contraseña
        const { id, nombre, hash, rol, tokenTable, id_sede } = userData;

        // Verificar si la contraseña ingresada coincide con el hash almacenado
        const match = await bcrypt.compare(password, hash);
        if (!match) {
            throw new Error("Credenciales inválidas");
        }

        // Obtener el nombre de la sede a la que pertenece el usuario (solo para coord_sede)
        const dataSede = rol === "coord_sede" ? await SedeModel.getDataSede(id_sede) : null;

        // Generar un token JWT
        const token = jwtGenerate(username, password, rol, tokenTable);
        
        // crear la data del token
        const tokenData = {
            token,
            ["id_" + rol]: id,
        };        

        // Subir el token a la base de datos
        await AdministrationModel.subirToken(tokenTable, tokenData);
        return [nombre, token, rol, (rol === "coord_sede" ? {id_sede, ...dataSede} : undefined)];
    },
    async expirarToken(username, rol, tokenTable) {
        // Determinar que tipo de usuario es quien cierra sesión

        const id = await AdministrationModel.getIdCoord(username, rol, tokenTable);

        // Generar un timestamp para la expiración del token
        const timestamp = new Date();

        // Obtener el último registro del token
        const { created_at } = await AdministrationModel.getLastTokenRegister(tokenTable, rol, id);
        
        // Expirar el token de la coordinadora general
        await AdministrationModel.expireToken(id, rol, tokenTable, created_at, timestamp);
    },
    async deleteData() {
        return await AdministrationModel.deleteData();
    },
    async crearEstadisticas() {
        const data = await AdministrationModel.getEstadisticas();

        const totales = {
            "Sede": "Totales",
            "Instructoras": 0,
            "Facilitadoras": 0,
            "Staff": 0,
            "Mentoras": 0,
            "Coordinadoras asociadas": 0,
            "Participantes": 0,
            "Total por sede": 0
        };
        
        // Añadir columna para calular los totales globales de cada rol
        data.map(row => {
            totales["Instructoras"] += row["Instructoras"];
            totales["Facilitadoras"] += row["Facilitadoras"];
            totales["Staff"] += row["Staff"];
            totales["Mentoras"] += row["Mentoras"];
            totales["Coordinadoras asociadas"] += row["Coordinadoras asociadas"];
            totales["Participantes"] += row["Participantes"];
            totales["Total por sede"] += row["Total por sede"];
        });

        // Añadir la fila de totales al final al objeto de datos
        data.push(totales);

        // Convertir los datos a CSV
        return { csv: Papa.unparse(data), fileName: `estadisticas_${new Date().toISOString().split('T')[0]}.csv` };
    }
}

module.exports = AdministrationService;