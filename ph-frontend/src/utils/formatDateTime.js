/**
 * Formatea una fecha en formato "dd/mm/aaaa, hh:mm"
 * @param {string | Date} fecha Fecha en formato ISO o Date object
 * @returns {string} Fecha formateada en español con hora y minuto
 */
export function formatDateTime(fecha) {
	if (!fecha) return "";

	const date = new Date(fecha);

	return date.toLocaleString("es-MX", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}