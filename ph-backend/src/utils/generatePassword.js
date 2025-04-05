const generator = require("generate-password");
const bcrypt = require("bcrypt");
const saltRounds = 11; // Número de rondas para el hash

async function generateRandomPassword(nombre_coord_sede) {
    // Incluir el nombre de la sede como prefijo en la contraseña
    const coordSedeSuffix = nombre_coord_sede.substring(0, 3).toUpperCase(); // Tomar los primeros 3 caracteres en mayúsculas
    
    // Generar una contraseña aleatoria
    const password = generator.generate({
        length: 11, 
        numbers: true,
        uppercase: true,
        lowercase: true,
    })

    // Hashear la contraseña generada
    return await bcrypt.hash(`${coordSedeSuffix}-${password}`, saltRounds);
}

module.exports = generateRandomPassword;