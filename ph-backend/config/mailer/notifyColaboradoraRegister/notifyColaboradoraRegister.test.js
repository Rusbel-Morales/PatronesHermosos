const { mock } = require("nodemailer");
const NotifyColaboradoraRegister = require("./notifyColaboradoraRegister");

describe("NotifyColaboradoraRegister Module", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("should send a notification email with default message", async () => {
		const notifyEmail = new NotifyColaboradoraRegister();
		const colaboradora = {
			nombre: "María González",
			correo: "maria.gonzalez@ejemplo.com",
		};

		await notifyEmail.sendEmail(colaboradora.nombre, colaboradora.correo);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(colaboradora.correo);
		expect(sentEmails[0].subject).toBe("Registro de Colaboradora");
		expect(sentEmails[0].text).toContain("Hola María González");
		expect(sentEmails[0].text).toContain("Tu registro como colaboradora ha sido exitoso");
	});

	it("should send a notification email with a custom message", async () => {
		const notifyEmail = new NotifyColaboradoraRegister();
		const colaboradora = {
			nombre: "Lucía Pérez",
			correo: "lucia.perez@ejemplo.com",
		};
		const customMessage = "Gracias por sumarte como colaboradora.";

		await notifyEmail.sendEmail(colaboradora.nombre, colaboradora.correo, customMessage);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(colaboradora.correo);
		expect(sentEmails[0].text).toContain(customMessage);
	});

	it("should handle email sending errors", async () => {
		const notifyEmail = new NotifyColaboradoraRegister();
		mock.setShouldFailOnce(true);

		await expect(
			notifyEmail.sendEmail("Ana Torres", "ana.torres@ejemplo.com")
		).rejects.toThrow();
	});
});