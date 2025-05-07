const { mock } = require("nodemailer");
const NotifySedeRegister = require("./notifySedeRegister");

describe("NotifySedeRegister", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto", async () => {
		const email = new NotifySedeRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Registro de Sede",
			text: "Hola Luis,\nEl registro de tu sede ha sido exitoso"
		});
	});

	it("debería permitir sobreescribir el mensaje", async () => {
		const email = new NotifySedeRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			mensaje: "¡Registro exitoso de tu sede en el sistema!"
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\n¡Registro exitoso de tu sede en el sistema!");
	});
});