const { mock } = require("nodemailer"); // use nodemailer mock

const AceptarPostulacionEmail = require("./aceptarPostulacionEmail");

describe("AceptarPostulacionEmail", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con asunto y mensaje por defecto basado en el rol", async () => {
		const email = new AceptarPostulacionEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			rol: "mentora"
		});

		const sentMail = mock.getSentMail();

		expect(sentMail).toHaveLength(1);
		expect(sentMail[0]).toMatchObject({
			from: process.env.EMAIL_USER,
			to: "luis@example.com",
			subject: "Aprobación de Postulación a Patrones Hermosos",
			text: "Hola Luis,\nTu postulación como mentora ha sido aprobada con éxito"
		});
	});

	it("debería permitir sobreescribir el mensaje manualmente", async () => {
		const email = new AceptarPostulacionEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			rol: "mentora", // no afecta si se manda mensaje
			mensaje: "¡Enhorabuena, fuiste seleccionada como mentora oficial!"
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\n¡Enhorabuena, fuiste seleccionada como mentora oficial!");
	});
});