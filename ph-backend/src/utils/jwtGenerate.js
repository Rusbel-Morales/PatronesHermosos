const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function jwtGenerate(username, password, rol, tokenTable) {
    // Generate a JWT token with the username and password
    return jwt.sign(
        { username, password, rol, tokenTable }, 
        process.env.JWT_SECRET_KEY, 
    );
};

module.exports = jwtGenerate;