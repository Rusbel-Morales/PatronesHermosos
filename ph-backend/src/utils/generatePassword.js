const generator = require("generate-password");

async function generateRandomPassword(nombre_coord_sede) {
    // Incluir el nombre de la sede como prefijo en la contraseña
    const coordSedeSuffix = nombre_coord_sede.substring(0, 3).toUpperCase(); // Tomar los primeros 3 caracteres en mayúsculas
    
    // Generar una contraseña aleatoria
    return coordSedeSuffix + generator.generate({
        length: 11, 
        numbers: true,
        uppercase: true,
        lowercase: true,
    });
}

module.exports = generateRandomPassword;