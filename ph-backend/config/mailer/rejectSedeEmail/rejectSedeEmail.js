// rejectSedeEmail.js
const MailerBehaviour = require("../MailerBehaviour.js");
const transporter = require("../transporter");

class RejectSedeEmail extends MailerBehaviour {
	async sendEmail(nombre, correo, mensaje = "Tu sede ha sido rechazada") {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: correo,
			subject: "Rechazo de Sede",
			text: `Hola ${nombre},\n${mensaje}`,
		};

		return await transporter.sendMail(mailOptions);
	}
}

module.exports = RejectSedeEmail;