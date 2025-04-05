const CoordGeneralService = require("../../services/coordGeneral.service");
const CoordGeneralModel = require("../../models/coordGeneral.model");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../../utils/jwtGenerate");

jest.mock("../../models/coordGeneral.model");
jest.mock("bcrypt");
jest.mock("../../utils/jwtGenerate");

describe("CoordGeneralService", () => {
    describe("verificarCredenciales", () => {
        it("should throw an error if the user does not exist", async () => {
            CoordGeneralModel.getPassword.mockResolvedValue({ hash: null });

            await expect(CoordGeneralService.verificarCredenciales("user", "password"))
                .rejects
                .toThrow("El usuario ingresado no existe");
        });

        it("should throw an error if the password does not match", async () => {
            CoordGeneralModel.getPassword.mockResolvedValue({ id_coord_general: 1, hash: "hashedPassword" });
            bcrypt.compare.mockResolvedValue(false);

            await expect(CoordGeneralService.verificarCredenciales("user", "password"))
                .rejects
                .toThrow("Credenciales inválidas");
        });

        it("should return a token if credentials are valid", async () => {
            const mockToken = "mockToken";
            CoordGeneralModel.getPassword.mockResolvedValue({ id_coord_general: 1, hash: "hashedPassword" });
            bcrypt.compare.mockResolvedValue(true);
            jwtGenerate.mockReturnValue(mockToken);
            CoordGeneralModel.subirToken.mockResolvedValue();

            const token = await CoordGeneralService.verificarCredenciales("user", "password");

            expect(token).toBe(mockToken);
            expect(CoordGeneralModel.subirToken).toHaveBeenCalledWith({
                id_coord_general: 1,
                token: mockToken
            });
        });
    });

    describe("expirarToken", () => {
        it("should expire the token for the given user", async () => {
            const mockId = 1;
            const mockCreatedAt = new Date("2023-01-01T00:00:00Z");
            const mockTimestamp = new Date();

            CoordGeneralModel.getId.mockResolvedValue(mockId);
            CoordGeneralModel.getLastTokenRegister.mockResolvedValue({ created_at: mockCreatedAt });
            CoordGeneralModel.expireToken.mockResolvedValue();

            await CoordGeneralService.expirarToken("user");

            expect(CoordGeneralModel.getId).toHaveBeenCalledWith("user");
            expect(CoordGeneralModel.getLastTokenRegister).toHaveBeenCalledWith(mockId);
            expect(CoordGeneralModel.expireToken).toHaveBeenCalledWith(mockId, mockCreatedAt, mockTimestamp);
        });
    });
});