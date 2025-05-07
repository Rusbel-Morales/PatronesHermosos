// src/middleware/token.middleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { verificarToken } = require("../models/token.model.js");

dotenv.config();

const tokenMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({ error: "No se proporcionó un token" });
		}

		// Extraer el token de la cabecera de autorización
		const token = authHeader.split(" ")[1];
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decoded) {
			return res.status(401).json({ error: "Token inválido" });
		}

		await verificarToken(decoded.tokenTable, token);
		next();
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

module.exports = tokenMiddleware;