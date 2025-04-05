// Load the real nodemailer module
const nodemailer = require("nodemailer");

// Use nodemailer-mock to create a mock transport
const nodemailermock = require("nodemailer-mock").getMockFor(nodemailer);

// Export the mocked version
module.exports = nodemailermock;