const { mock } = require("nodemailer"); // use nodemailer mock
const ApproveSedeEmail = require("./approveSedeEmail");

describe("ApproveSedeEmail Module", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("should send an approval email with default message", async () => {
		const approveEmail = new ApproveSedeEmail();
		const sede = {
			nombre: "Centro Cultural",
			correo: "centro@ejemplo.com",
		};

		await approveEmail.sendEmail(sede.nombre, sede.correo);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(sede.correo);
		expect(sentEmails[0].subject).toBe("Aprobación de Sede");
		expect(sentEmails[0].text).toContain("Hola Centro Cultural");
		expect(sentEmails[0].text).toContain("Tu sede ha sido aprobada con éxito");
	});

	it("should send an approval email with a custom message", async () => {
		const approveEmail = new ApproveSedeEmail();
		const sede = {
			nombre: "Biblioteca Popular",
			correo: "biblioteca@ejemplo.com",
		};
		const customMessage = "¡Felicitaciones! Tu sede fue aceptada.";

		await approveEmail.sendEmail(sede.nombre, sede.correo, customMessage);

		const sentEmails = mock.getSentMail();
		expect(sentEmails.length).toBe(1);
		expect(sentEmails[0].to).toBe(sede.correo);
		expect(sentEmails[0].text).toContain(customMessage);
	});

	it("should handle email sending errors", async () => {
		const approveEmail = new ApproveSedeEmail();
		mock.setShouldFailOnce(true);

		await expect(
			approveEmail.sendEmail("Sala Comunitaria", "sala@ejemplo.com")
		).rejects.toThrow();
	});
});