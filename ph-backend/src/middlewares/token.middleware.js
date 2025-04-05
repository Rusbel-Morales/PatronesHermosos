// src/middleware/token.middleware.js
const { verificarToken } = require("../models/token.model.js");

const tokenMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new Error("Missing authorization header");
		}
		const token = authHeader.split(" ")[1];
		await verificarToken(token);
		next();
	} catch (error) {
		res.status(401).json({ message: "Token de sesión requerido" });
	}
};

module.exports = tokenMiddleware;