// authHelper.js

/**
 * Obtiene el token JWT almacenado en localStorage.
 * @returns {string|null} El token si existe, o null si no está.
 */
export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  /**
   * Elimina el token del localStorage (por ejemplo, en logout).
   */
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  
  /**
   * Verifica si el usuario está autenticado.
   * @returns {boolean} true si hay token, false si no.
   */
  export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  