// app.js
// Archivo principal de la aplicación, donde se configuran los middlewares y se definen las rutas de la API REST.

const express = require("express");
const cors = require("cors");

// Importación de rutas
const sedeRoutes = require("./routes/sede.routes.js");
const participanteRoutes = require("./routes/participante.routes.js");
const personalRoutes = require("./routes/personal.routes.js");
const coordGeneralRoutes = require("./routes/coordGeneral.routes.js");
const dashboardRoutes = require("./routes/dashboard.routes.js");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/sedes", sedeRoutes);
app.use("/participantes", participanteRoutes);
app.use("/personal", personalRoutes);
app.use("/coordGeneral", coordGeneralRoutes);

// Datos para la coordinadora general
app.use("/dashboard", dashboardRoutes);

module.exports = app;