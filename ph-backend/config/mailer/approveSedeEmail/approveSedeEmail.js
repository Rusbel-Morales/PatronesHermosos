// approveSedeEmail.js
const MailerBehaviour = require("../MailerBehaviour.js");
const transporter = require("../transporter");

class ApproveSedeEmail extends MailerBehaviour {
	async sendEmail(nombre, correo, mensaje = "Tu sede ha sido aprobada con éxito") {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: correo,
			subject: "Aprobación de Sede",
			text: `Hola ${nombre},\n${mensaje}`,
		};

		return await transporter.sendMail(mailOptions);
	}
}

module.exports = ApproveSedeEmail;