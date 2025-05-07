// Mailer.js

class Mailer {
  constructor(mailerBehaviour) {
    this.mailerBehaviour = mailerBehaviour;
  }

  async sendEmail(data) {
    return this.mailerBehaviour.sendEmail(data);
  }
}

module.exports = Mailer;