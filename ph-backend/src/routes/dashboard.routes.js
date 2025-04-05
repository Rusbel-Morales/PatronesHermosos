const express = require('express');
const DashboardController = require("../controllers/dashboard.controller.js")

const router = express.Router();

router.get("/overview", DashboardController.getDashboardData);

module.exports = router;