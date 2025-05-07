const express = require("express");
const GrupoController = require("../controllers/grupo.controller.js");
const router = express.Router();

router.post("/registro", GrupoController.registrarGrupos);
router.get("/obtener-grupos-sede", GrupoController.obtenerGruposSede);
router.patch("/actualizar-grupos-sede", GrupoController.actualizarGrupos);
router.get("/generar-grupos-automaticos", GrupoController.generarGruposAutomaticos);
router.delete("/eliminar-grupos-sede", GrupoController.eliminarGrupos);

module.exports = router;