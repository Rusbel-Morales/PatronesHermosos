const { mock } = require("nodemailer");
const NotifyMentoraRegister = require("./notifyMentoraRegister");

describe("NotifyMentoraRegister", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto", async () => {
		const email = new NotifyMentoraRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Registro de Mentora",
			text: "Hola Luis,\nHas sido registrada como mentora"
		});
	});

	it("debería permitir sobreescribir el mensaje", async () => {
		const email = new NotifyMentoraRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			mensaje: "¡Te damos la bienvenida como mentora oficial!"
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\n¡Te damos la bienvenida como mentora oficial!");
	});
});