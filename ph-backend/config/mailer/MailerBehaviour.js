// MailerBehaviour.js

const transporter = require("./transporter");

class MailerBehaviour {
	async sendEmail(data) {
		const { nombre, correo, mensaje } = data;

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: correo,
			subject: this.getSubject(data),
			text: `Hola ${nombre},\n${mensaje || this.getDefaultMessage(data)}`,
		};

		return await transporter.sendMail(mailOptions);
	}

	/**
	 * Debe devolver el asunto del correo. Puede acceder a los datos completos si lo requiere.
	 */
	getSubject(data) {
		throw new Error("Método getSubject() no implementado");
	}

	/**
	 * Debe devolver el mensaje por defecto del correo. Puede personalizarlo según los datos.
	 */
	getDefaultMessage(data) {
		throw new Error("Método getDefaultMessage() no implementado");
	}
}

module.exports = MailerBehaviour;