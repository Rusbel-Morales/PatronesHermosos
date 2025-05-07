// notifyParticipanteRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");

class NotifyParticipanteRegister extends MailerBehaviour {
	getSubject() {
		return "Registro de Participante";
	}

	getDefaultMessage() {
		return "Tu registro como participante ha sido exitoso";
	}
}

module.exports = NotifyParticipanteRegister;