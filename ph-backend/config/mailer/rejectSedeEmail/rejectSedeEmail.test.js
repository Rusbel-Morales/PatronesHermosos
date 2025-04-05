const { mock } = require("nodemailer");
const RejectSedeEmail = require("./rejectSedeEmail");

describe("RejectSedeEmail Module", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("should send a sede rejection email with default message", async () => {
		const rejectEmail = new RejectSedeEmail();
		const sede = {
			nombre: "Casa Cultural Sur",
			correo: "casacultural@ejemplo.com",
		};

		await rejectEmail.sendEmail(sede.nombre, sede.correo);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(sede.correo);
		expect(sentEmails[0].subject).toBe("Rechazo de Sede");
		expect(sentEmails[0].text).toContain("Hola Casa Cultural Sur");
		expect(sentEmails[0].text).toContain("Tu sede ha sido rechazada");
	});

	it("should send a sede rejection email with a custom message", async () => {
		const rejectEmail = new RejectSedeEmail();
		const sede = {
			nombre: "Espacio Comunal Norte",
			correo: "espaciocomunal@ejemplo.com",
		};
		const customMessage = "Lamentablemente tu sede no fue seleccionada en esta edición.";

		await rejectEmail.sendEmail(sede.nombre, sede.correo, customMessage);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(sede.correo);
		expect(sentEmails[0].text).toContain(customMessage);
	});

	it("should handle email sending errors", async () => {
		const rejectEmail = new RejectSedeEmail();
		mock.setShouldFailOnce(true);

		await expect(
			rejectEmail.sendEmail("Red Comunitaria", "red@ejemplo.com")
		).rejects.toThrow();
	});
});