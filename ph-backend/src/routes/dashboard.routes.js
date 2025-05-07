const express = require('express');
const DashboardController = require("../controllers/dashboard.controller.js")

const router = express.Router();

router.get("/coordGeneralOverview", DashboardController.getCoordGeneralDashboardData);
router.get("/coordSedeOverview", DashboardController.getCoordSedeDashboardData);

module.exports = router;