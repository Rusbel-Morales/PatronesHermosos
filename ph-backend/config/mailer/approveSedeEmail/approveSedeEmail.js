// approveSedeEmail.js

const MailerBehaviour = require("../MailerBehaviour.js");

class ApproveSedeEmail extends MailerBehaviour {
	getSubject() {
		return "Aprobación de Sede";
	}

	getDefaultMessage(data) {
		return `Tu sede ha sido aprobada con éxito. Tu contraseña es: ${data.password}`;
	}
}

module.exports = ApproveSedeEmail;