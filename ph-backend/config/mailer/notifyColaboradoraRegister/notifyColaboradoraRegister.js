// notifyColaboradoraRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");
const transporter = require("../transporter");

class NotifyColaboradoraRegister extends MailerBehaviour {
	async sendEmail(nombre, correo, mensaje = "Tu registro como colaboradora ha sido exitoso") {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: correo,
			subject: "Registro de Colaboradora",
			text: `Hola ${nombre},\n${mensaje}`,
		};

		return await transporter.sendMail(mailOptions);
	}
}

module.exports = NotifyColaboradoraRegister;