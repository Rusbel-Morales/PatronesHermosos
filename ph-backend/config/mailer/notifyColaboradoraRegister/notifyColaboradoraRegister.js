// notifyColaboradoraRegister.js

const MailerBehaviour = require("../MailerBehaviour.js");

class NotifyColaboradoraRegister extends MailerBehaviour {
	getSubject() {
		return "Registro de Colaboradora";
	}

	getDefaultMessage() {
		return "Tu registro como colaboradora ha sido exitoso";
	}
}

module.exports = NotifyColaboradoraRegister;