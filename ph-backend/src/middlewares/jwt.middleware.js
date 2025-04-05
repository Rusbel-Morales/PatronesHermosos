const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyTokenMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No se proporcionó un token" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Guardar los datos del usuario en el objeto
        req.user = decoded;
        next();

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = verifyTokenMiddleware;