const { mock } = require("nodemailer");
const RejectSedeEmail = require("./rejectSedeEmail");

describe("RejectSedeEmail", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto", async () => {
		const email = new RejectSedeEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Rechazo de Sede",
			text: "Hola Luis,\nTu sede ha sido rechazada"
		});
	});

	it("debería permitir sobreescribir el mensaje", async () => {
		const email = new RejectSedeEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			mensaje: "Hemos revisado tu sede y no cumple con los requisitos mínimos."
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\nHemos revisado tu sede y no cumple con los requisitos mínimos.");
	});
});