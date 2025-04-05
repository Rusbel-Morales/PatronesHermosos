// participante.routes.js
// Se encarga de definir las rutas relacionadas con los participantes en la API REST, utilizando el controlador ParticipanteController.

const express = require("express");
const upload = require("../middlewares/upload.middleware.js");
const ParticipanteController = require("../controllers/participante.controller.js");


const router = express.Router();

// Usamos middleware para aplicarlo a una ruta en específico
router.post("/registro", upload.single("permiso_tutor"), ParticipanteController.registrarParticipante);

module.exports = router;