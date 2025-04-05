📦 Patrones Hermosos - Backend

Este es el backend del sistema Patrones Hermosos, desarrollado con Node.js, Express y Sequelize (MySQL).
Se encarga de la gestión de sedes, participantes, personal y autenticación.

⸻

🚀 Tecnologías Utilizadas
•	Node.js - Entorno de ejecución de JavaScript.
•	Express.js - Framework web para construir la API.
•	Sequelize - ORM para gestionar la base de datos MySQL.
•	Multer - Manejo de subida de archivos (convocatorias, permisos).
•	Nodemailer - Envío de correos electrónicos de confirmación.
•	Dotenv - Gestión de variables de entorno.
•	Cors - Configuración de seguridad para acceso externo a la API.

⸻

📂 Estructura del Proyecto
```
patrones-hermosos-backend/
│── src/                    # Código fuente
│   ├── config/             # Configuración global (DB, Mailer, Logs, Variables de entorno)
│   ├── controllers/        # Lógica para manejar las peticiones HTTP
│   ├── middlewares/        # Middlewares de autenticación, validación, subida de archivos
│   ├── models/             # Modelos de base de datos (Sequelize)
│   ├── routes/             # Definición de rutas de la API
│   ├── services/           # Lógica de negocio (procesamiento de datos antes de DB)
│   ├── utils/              # Utilidades globales (manejadores de archivos, correos, etc.)
│   ├── app.js              # Configuración de Express
│   ├── server.js           # Inicialización del servidor
│── tests/                  # Pruebas unitarias e integración
│── public/                 # Archivos públicos (si se requieren)
│── .env                    # Variables de entorno
│── package.json            # Dependencias y scripts
│── README.md               # Documentación del proyecto
```


⸻

📜 Guía para Desarrolladores

📌 1️⃣ Cómo Configurar el Proyecto

🔹 Requisitos previos
•	Node.js v18+
•	MySQL v8+
•	Un gestor de dependencias como npm o yarn

🔹 Instalar Dependencias

npm install

🔹 Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto y agrega:
```
PORT=3000
DB_NAME=patrones_hermosos_db
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
EMAIL_USER=tuemail@gmail.com
EMAIL_PASSWORD=tucontraseña
```

🔹 Iniciar el Servidor
```
npm run dev
```
El servidor iniciará en http://localhost:3000.

⸻

📌 2️⃣ Cómo Crear un Nuevo Feature

Cuando se añade una nueva funcionalidad, se deben crear archivos en 4 carpetas clave:

📂 Carpeta	📝 Propósito  
models/	Definir la estructura de la base de datos (Sequelize)  
controllers/	Manejar las peticiones HTTP  
services/	Lógica de negocio y validaciones  
routes/	Definir las rutas de la API

⸻

📌 Ejemplo: Cómo Agregar una Nueva Funcionalidad

Supongamos que queremos agregar la funcionalidad de gestionar mentoras.

1️⃣ Crear el modelo (models/mentora.model.js)
```
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Mentora = sequelize.define("Mentora", {
id_mentora: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true,
},
nombre: {
type: DataTypes.STRING(255),
allowNull: false,
},
correo: {
type: DataTypes.STRING(255),
allowNull: false,
unique: true,
},
});

export default Mentora;
```
2️⃣ Crear el servicio (services/mentora.service.js)
```
import Mentora from "../models/mentora.model.js";

const MentoraService = {
async registrarMentora({ nombre, correo }) {
return await Mentora.create({ nombre, correo });
},
};

export default MentoraService;
```
3️⃣ Crear el controlador (controllers/mentora.controller.js)
```
import MentoraService from "../services/mentora.service.js";

const MentoraController = {
async registrarMentora(req, res) {
try {
const mentoraData = req.body;
const result = await MentoraService.registrarMentora(mentoraData);
res.status(201).json({ message: "Mentora registrada con éxito", mentora: result });
} catch (error) {
res.status(500).json({ error: "Error al registrar la mentora", details: error.message });
}
},
};

export default MentoraController;
```
4️⃣ Crear las rutas (routes/mentora.routes.js)
```
import express from "express";
import MentoraController from "../controllers/mentora.controller.js";

const router = express.Router();

router.post("/registro", MentoraController.registrarMentora);

export default router;
```
5️⃣ Agregar las rutas al servidor (app.js)
```
import mentoraRoutes from "./routes/mentora.routes.js";

app.use("/mentoras", mentoraRoutes);

Ahora la funcionalidad está lista para ser usada. Puedes probarla con una API como Postman enviando una solicitud POST a:

http://localhost:3000/mentoras/registro
```
⸻

📌 3️⃣ Estandarización del Código

Para mantener un código limpio y organizado, seguimos estos principios:

✅ Sequelize para modelos – Cada entidad tiene su propio archivo en /models/.
✅ Separación de lógica – Controladores gestionan las peticiones, los servicios aplican lógica de negocio.
✅ Middlewares para seguridad – Implementamos middlewares en /middlewares/ para validar datos y roles.
✅ Uso de .env para configuraciones – No exponemos credenciales en el código.

Ejemplo de una API organizada correctamente:
```
POST   /mentoras/registro     -> Registrar una mentora
GET    /mentoras              -> Obtener lista de mentoras
PUT    /mentoras/:id          -> Actualizar datos de una mentora
DELETE /mentoras/:id          -> Eliminar una mentora
```
⸻

🔍 Pruebas

Para ejecutar pruebas unitarias (cuando estén implementadas):
```
npm test
```
Las pruebas se encuentran en la carpeta tests/.

⸻