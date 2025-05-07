const { mock } = require("nodemailer");
const RechazarPostulacionEmail = require("./rechazarPostulacionEmail");

describe("RechazarPostulacionEmail", () => {
	beforeEach(() => {
		mock.reset();
	});

	it("debería enviar un correo con el mensaje por defecto según el rol", async () => {
		const email = new RechazarPostulacionEmail();
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
			subject: "Actualización de postulación a Patrones Hermosos",
			text: "Hola Luis,\nTu registro como mentora ha sido rechazada. Si tienes dudas, por favor contacta a la administración de Patrones Hermosos."
		});
	});

	it("debería permitir sobreescribir el mensaje manualmente", async () => {
		const email = new RechazarPostulacionEmail();
		await email.sendEmail({
			nombre: "Luis",
			correo: "luis@example.com",
			rol: "mentora",
			mensaje: "Lamentablemente tu solicitud fue rechazada por falta de documentos."
		});

		const sentMail = mock.getSentMail();
		expect(sentMail[0].text).toBe("Hola Luis,\nLamentablemente tu solicitud fue rechazada por falta de documentos.");
	});
});