const { mock } = require("nodemailer");
const NotifySedeRegister = require("./notifySedeRegister");

describe("NotifySedeRegister Module", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("should send a sede registration email with default message", async () => {
		const notifyEmail = new NotifySedeRegister();
		const sede = {
			nombre: "Casa Cultural Oeste",
			correo: "casa.oeste@ejemplo.com",
		};

		await notifyEmail.sendEmail(sede.nombre, sede.correo);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(sede.correo);
		expect(sentEmails[0].subject).toBe("Registro de Sede");
		expect(sentEmails[0].text).toContain("Hola Casa Cultural Oeste");
		expect(sentEmails[0].text).toContain("El registro de tu sede ha sido exitoso");
	});

	it("should send a sede registration email with a custom message", async () => {
		const notifyEmail = new NotifySedeRegister();
		const sede = {
			nombre: "Espacio Norte",
			correo: "espacio.norte@ejemplo.com",
		};
		const customMessage = "¡Gracias por registrar tu sede! Te contactaremos pronto.";

		await notifyEmail.sendEmail(sede.nombre, sede.correo, customMessage);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(sede.correo);
		expect(sentEmails[0].text).toContain(customMessage);
	});

	it("should handle email sending errors", async () => {
		const notifyEmail = new NotifySedeRegister();
		mock.setShouldFailOnce(true);

		await expect(
			notifyEmail.sendEmail("Red Sur", "red.sur@ejemplo.com")
		).rejects.toThrow();
	});
});