const { mock } = require("nodemailer");
const NotifyParticipanteRegister = require("./notifyParticipanteRegister");

describe("NotifyParticipanteRegister", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto", async () => {
		const email = new NotifyParticipanteRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Registro de Participante",
			text: "Hola Luis,\nTu registro como participante ha sido exitoso"
		});
	});

	it("debería permitir sobreescribir el mensaje", async () => {
		const email = new NotifyParticipanteRegister();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			mensaje: "¡Bienvenido a Patrones Hermosos como participante!"
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\n¡Bienvenido a Patrones Hermosos como participante!");
	});
});