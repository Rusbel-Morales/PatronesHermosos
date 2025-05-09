// sede.routes.js
// Se encarga de definir las rutas relacionadas con las sedes en la API REST, utilizando el controlador SedeController.

const express = require("express");
const upload = require("../middlewares/upload.middleware.js");
const SedeController = require("../controllers/sede/sede.controller.js");
const PdfController = require("../controllers/pdf.controller.js");
const tokenMiddleware = require("../middlewares/token.middleware");

const router = express.Router();

router.get("/obtenerSedes", SedeController.obtenerSedes);
router.get("/obtenerTodaInfoSedes", SedeController.obtenerTodaInfoSedes);
router.post("/registro", upload.single("convocatoria_firmada"), SedeController.registrarSede);
router.post("/:id/aceptar", SedeController.aceptarSede);
router.post("/:id/rechazar", SedeController.rechazarSede);
router.get("/:id/detalles", SedeController.obtenerDetallesUnaSede);
router.post("/:id_aplicante/postulaciones/aceptar", SedeController.aceptarPostulacion);
router.post("/:id_aplicante/postulaciones/rechazar", SedeController.rechazarPostulacion);
router.get("/:id/descargar-convocatoria-sede", tokenMiddleware, PdfController.descargarConvocatoriaSede);

module.exports = router;