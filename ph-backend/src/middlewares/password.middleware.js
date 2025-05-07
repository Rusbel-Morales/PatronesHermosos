const CoordGeneralModel = require('../models/coordGeneral.model.js');
const bcrypt = require("bcrypt");

async function verifyPasswordMiddleware(req, res, next) {
    const { password } = req.body;

    const { passwordHash } = await CoordGeneralModel.getHashPassword();
    const match = await bcrypt.compare(password, passwordHash);

    // Verificar si la contraseña ingresada coincide con el hash almacenado
    return !match ? res.status(401).json({ error: "Contraseña incorrecta" }) : next();
}

module.exports = verifyPasswordMiddleware;