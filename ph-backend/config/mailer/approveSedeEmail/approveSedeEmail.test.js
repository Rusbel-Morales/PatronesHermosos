const { mock } = require("nodemailer"); // nodemailer-mock
const ApproveSedeEmail = require("./approveSedeEmail");

describe("ApproveSedeEmail", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto", async () => {
		const email = new ApproveSedeEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			password: "123456"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Aprobación de Sede",
			text: "Hola Luis,\nTu sede ha sido aprobada con éxito. Tu contraseña es: 123456"
		});
	});

	it("debería permitir sobreescribir el mensaje", async () => {
		const email = new ApproveSedeEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			password: "123456",
			mensaje: "¡Enhorabuena, tu sede fue validada!"
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\n¡Enhorabuena, tu sede fue validada!");
	});
});