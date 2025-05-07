// notifyMentoraRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");

class NotifyMentoraRegister extends MailerBehaviour {
	getSubject() {
		return "Registro de Mentora";
	}

	getDefaultMessage() {
		return "Has sido registrada como mentora";
	}
}

module.exports = NotifyMentoraRegister;