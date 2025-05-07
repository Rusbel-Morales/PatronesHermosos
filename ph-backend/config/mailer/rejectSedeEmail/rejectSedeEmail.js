// rejectSedeEmail.js

const MailerBehaviour = require("../MailerBehaviour.js");

class RejectSedeEmail extends MailerBehaviour {
	getSubject() {
		return "Rechazo de Sede";
	}

	getDefaultMessage() {
		return "Tu sede ha sido rechazada";
	}
}

module.exports = RejectSedeEmail;