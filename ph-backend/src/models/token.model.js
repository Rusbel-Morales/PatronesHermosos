// token.model.js

const supabase = require('../../config/database');

const TokenModel = {
	async verificarToken(token) {
		const { data, error } = await supabase
			.from("token")
			.select("token")
			.eq("token", token)
			.single();

		if (error) {
			if (error.statusCode === 404) {
				throw new Error("Token de sesión requerido");
			} else {
				throw new Error("Error al verificar el token: " + error.message);
			}
		}

		return data;
	}
};

module.exports = TokenModel;