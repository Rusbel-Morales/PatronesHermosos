const express = require("express");
const PersonalController = require("../controllers/personal.controller.js");

const router = express.Router();

router.post("/registro", PersonalController.registrarPersonal);

module.exports = router;