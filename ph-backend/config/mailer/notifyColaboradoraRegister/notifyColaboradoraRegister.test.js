const { mock } = require("nodemailer");
const NotifyColaboradoraRegister = require("./notifyColaboradoraRegister");

describe("NotifyColaboradoraRegister", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto", async () => {
		const email = new NotifyColaboradoraRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Registro de Colaboradora",
			text: "Hola Luis,\nTu registro como colaboradora ha sido exitoso"
		});
	});

	it("debería permitir sobreescribir el mensaje", async () => {
		const email = new NotifyColaboradoraRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			mensaje: "¡Bienvenida al equipo como colaboradora!"
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\n¡Bienvenida al equipo como colaboradora!");
	});
});