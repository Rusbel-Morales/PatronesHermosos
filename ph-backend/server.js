// server.js
// Archivo principal del servidor, se encarga de inicializar el servidor y definir las rutas de la API REST.

const app = require("./src/app.js");
const dotenv = require("dotenv");

dotenv.config()

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});