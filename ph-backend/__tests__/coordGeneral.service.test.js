const CoordGeneralService = require("../src/services/coordGeneral.service");
const CoordGeneralModel = require("../src/models/coordGeneral.model");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../src/utils/jwtGenerate");

jest.mock("../src/models/coordGeneral.model");
jest.mock("bcrypt");
jest.mock("../src/utils/jwtGenerate");

describe("CoordGeneralService", () => {
	describe("verificarCredenciales", () => {
		it("should throw an error if the user does not exist", async () => {
			CoordGeneralModel.getPassword.mockResolvedValue({ hash: null });

			await expect(CoordGeneralService.verificarCredenciales("username", "password"))
				.rejects
				.toThrow("El usuario ingresado no existe");
		});

		it("should throw an error if the password is incorrect", async () => {
			CoordGeneralModel.getPassword.mockResolvedValue({ hash: "hashedPassword" });
			bcrypt.compare.mockResolvedValue(false);

			await expect(CoordGeneralService.verificarCredenciales("username", "password"))
				.rejects
				.toThrow("Credenciales inválidas");
		});

		it("should return a token if the credentials are correct", async () => {
			CoordGeneralModel.getPassword.mockResolvedValue({ id_coord_general: 1, hash: "hashedPassword" });
			bcrypt.compare.mockResolvedValue(true);
			jwtGenerate.mockReturnValue("token");
			CoordGeneralModel.subirToken.mockResolvedValue();

			const token = await CoordGeneralService.verificarCredenciales("username", "password");

			expect(token).toBe("token");
			expect(CoordGeneralModel.subirToken).toHaveBeenCalledWith({ id_coord_general: 1, token: "token" });
		});
	});

	describe("expirarToken", () => {
		it("should expire the token", async () => {
			CoordGeneralModel.getId.mockResolvedValue(1);
			CoordGeneralModel.getLastTokenRegister.mockResolvedValue({ created_at: new Date() });
			CoordGeneralModel.expireToken.mockResolvedValue();

			await CoordGeneralService.expirarToken("username");

			expect(CoordGeneralModel.expireToken).toHaveBeenCalled();
		});
	});
});