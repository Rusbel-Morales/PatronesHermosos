// Mailer.js

class Mailer {
  constructor(mailerBehaviour) {
    this.mailerBehaviour = mailerBehaviour;
  }

  async sendEmail(nombre, correo) {
    return this.mailerBehaviour.sendEmail(nombre, correo);
  }
}

module.exports = Mailer;