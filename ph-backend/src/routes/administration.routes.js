const express = require("express");
const AdministrationController = require("../controllers/administration/administration.controller.js");
const verifyTokenMiddleware = require("../middlewares/jwt.middleware.js");
const verifyPasswordMiddleware = require("../middlewares/password.middleware.js");

const router = express.Router();

router.post("/login", AdministrationController.login);
router.patch("/logout", verifyTokenMiddleware, AdministrationController.logout);
router.delete("/deleteData", verifyPasswordMiddleware, AdministrationController.deleteData);
router.get("/crearEstadisticas", AdministrationController.crearEstadisticas);

module.exports = router;