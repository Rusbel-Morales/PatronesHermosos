// notifyColaboradoraRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");
const transporter = require("../transporter");

class NotifyParticipanteRegister extends MailerBehaviour {
	async sendEmail(nombre, correo, mensaje = "Tu registro como participante ha sido exitoso") {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: correo,
			subject: "Registro de Participante",
			text: `Hola ${nombre},\n${mensaje}`,
		};

		return await transporter.sendMail(mailOptions);
	}
}

module.exports = NotifyParticipanteRegister;