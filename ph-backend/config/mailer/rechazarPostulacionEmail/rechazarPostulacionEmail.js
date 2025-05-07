// rechazarPostulacionEmail.js

const MailerBehaviour = require("../MailerBehaviour.js");

class RechazarPostulacionEmail extends MailerBehaviour {
	getSubject() {
		return "Actualización de postulación a Patrones Hermosos";
	}

	getDefaultMessage({ rol }) {
		return `Tu registro como ${rol} ha sido rechazada. Si tienes dudas, por favor contacta a la administración de Patrones Hermosos.`;
	}
}

module.exports = RechazarPostulacionEmail;