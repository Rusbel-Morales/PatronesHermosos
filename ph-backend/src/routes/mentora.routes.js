const express = require("express");

const MentoraController = require("../controllers/mentora.controller.js");
const router = express.Router();

router.post("/registro", MentoraController.registarMentora);

module.exports = router;