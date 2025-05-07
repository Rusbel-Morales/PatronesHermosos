// aceptarPostulacionEmail.js

const MailerBehaviour = require("../MailerBehaviour.js");

class AceptarPostulacionEmail extends MailerBehaviour {
	getSubject() {
		return "Aprobación de Postulación a Patrones Hermosos";
	}

	getDefaultMessage({ rol }) {
		return `Tu postulación como ${rol} ha sido aprobada con éxito`;
	}
}

module.exports = AceptarPostulacionEmail;