// notifySedeRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");

class NotifySedeRegister extends MailerBehaviour {
	getSubject() {
		return "Registro de Sede";
	}

	getDefaultMessage() {
		return "El registro de tu sede ha sido exitoso";
	}
}

module.exports = NotifySedeRegister;