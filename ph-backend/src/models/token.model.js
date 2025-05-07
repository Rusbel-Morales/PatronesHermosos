// token.model.js
const supabase = require('../../config/database');

const TokenModel = {
	async verificarToken(tokenTable, token) {
		const { _, error } = await supabase
			.from(tokenTable)
			.select("token")
			.eq("token", token)
			.single();

		if (error) {
			throw new Error("Error al verificar el token: " + error.message);
		}
	}
};

module.exports = TokenModel;