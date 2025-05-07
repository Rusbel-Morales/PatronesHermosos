const express = require("express");
const PersonalController = require("../controllers/personal.controller.js");

const router = express.Router();

router.post("/registro", PersonalController.registrarPersonal);
router.get("/usuariosEstadoRol", PersonalController.obtenerUsuariosEstadoRol);
router.get("/totalPersonalPorRol", PersonalController.obtenerTotalPersonalRol);
router.get('/listar', PersonalController.listarPersonal);

module.exports = router;