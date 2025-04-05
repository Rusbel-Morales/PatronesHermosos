// upload.middleware.js
// Middleware que se encarga de configurar la subida de archivos al servidor.

const multer = require("multer"); // Importar multer para recibir archivos en las peticiones HTTP 

const storage = multer.memoryStorage(); // Configurar multer para almacenar archivos en memoria
const upload = multer({ storage });  // Objeto de configuración que define el tipo de almacenamiento que se usará para los archivos subidos.

module.exports = upload; // Exportar el middleware para su uso en otros archivos