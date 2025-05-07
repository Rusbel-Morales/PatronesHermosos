// loginService.js
// Servicio para manejar la lógica de inicio de sesión y registro de usuarios.

import axios from "axios";
import apiConfig from "@/config/apiConfig.js";

/**
 * Realiza una solicitud de inicio de sesión.
 *
 * @param {string} username - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<string>} - Una promesa que resuelve el token de acceso si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud de inicio de sesión falla.
 */
export const postLogin = async (username, password) => {
	try {
		const response = await axios.post(`${apiConfig.baseUrl}/administration/login`, {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		throw new Error("Error al iniciar sesión " + error.message);
	}
}