// notifyColaboradoraRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");
const transporter = require("../transporter");

class NotifySedeRegister extends MailerBehaviour {
	async sendEmail(nombre, correo, mensaje = "El registro de tu sede ha sido exitoso") {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: correo,
			subject: "Registro de Sede",
			text: `Hola ${nombre},\n${mensaje}`,
		};

		return await transporter.sendMail(mailOptions);
	}
}

module.exports = NotifySedeRegister;