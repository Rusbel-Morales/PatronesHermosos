// apiConfig.js
// Configuración de la API para la aplicación.

/**
 * Detecta si el entorno actual es una prueba con Jest.
 * @type {boolean}
 */
const isJestTest = process.env.NODE_ENV === "test";

/**
 * Configuración de la API base de la aplicación.
 *
 * - Si se está ejecutando en Jest, se utiliza `process.env.VITE_API_URL`.
 * - En un entorno de desarrollo (Vite), se utiliza `import.meta.env.VITE_API_URL`.
 *
 * @type {{ baseUrl: string }}
 */
const apiConfig = {
	baseUrl: isJestTest
		? process.env.VITE_API_URL || "http://localhost:3000"
		: (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "http://localhost:3000"
};

export default apiConfig;