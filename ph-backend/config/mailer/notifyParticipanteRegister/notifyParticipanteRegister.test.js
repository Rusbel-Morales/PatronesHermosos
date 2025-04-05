const { mock } = require("nodemailer");
const NotifyParticipanteRegister = require("./notifyParticipanteRegister");

describe("NotifyParticipanteRegister Module", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("should send a participant registration email with default message", async () => {
		const notifyEmail = new NotifyParticipanteRegister();
		const participante = {
			nombre: "Carlos Ruiz",
			correo: "carlos.ruiz@ejemplo.com",
		};

		await notifyEmail.sendEmail(participante.nombre, participante.correo);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(participante.correo);
		expect(sentEmails[0].subject).toBe("Registro de Participante");
		expect(sentEmails[0].text).toContain("Hola Carlos Ruiz");
		expect(sentEmails[0].text).toContain("Tu registro como participante ha sido exitoso");
	});

	it("should send a participant registration email with a custom message", async () => {
		const notifyEmail = new NotifyParticipanteRegister();
		const participante = {
			nombre: "Elena Castro",
			correo: "elena.castro@ejemplo.com",
		};
		const customMessage = "Bienvenida al evento, estamos felices de tenerte.";

		await notifyEmail.sendEmail(participante.nombre, participante.correo, customMessage);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(participante.correo);
		expect(sentEmails[0].text).toContain(customMessage);
	});

	it("should handle email sending errors", async () => {
		const notifyEmail = new NotifyParticipanteRegister();
		mock.setShouldFailOnce(true);

		await expect(
			notifyEmail.sendEmail("Laura Méndez", "laura.mendez@ejemplo.com")
		).rejects.toThrow();
	});
});