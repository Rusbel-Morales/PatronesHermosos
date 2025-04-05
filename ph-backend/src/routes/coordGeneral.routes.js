const express = require("express");
const CoordGeneralController = require("../controllers/coordGeneral.controller.js");
const verifyTokenMiddleware = require("../middlewares/jwt.middleware.js")

const router = express.Router();

router.post("/login", CoordGeneralController.login);

router.use(verifyTokenMiddleware);
router.patch("/logout", CoordGeneralController.logout);

module.exports = router;