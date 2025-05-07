import { format } from "date-fns";
import { es } from "date-fns/locale";

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

export function formatearFecha(fecha) {
	if (!fecha) return "";

    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
}

export function convertDateToSpanish(fecha) {
    if (!fecha) return "";

	// Obtener los elementos de la fecha
	const [startYear, startMonth, startDay] = fecha.split("-");
	const [endYear, endMonth, endDay] = fecha.split("-");

	// Crear un nuevo objeto Date con los elementos de la fecha en formato UTC
	const startDate = new Date(+startYear, +startMonth - 1, +startDay);
	const endDate = new Date(+endYear, +endMonth - 1, +endDay + 5);

    // Formatear la fecha en español
	const formattedStartDate = format(startDate, "dd 'de' MMMM", { locale: es });
	const formattedEndDate = format(endDate, "dd 'de' MMMM 'de' yyyy", { locale: es });

	return `${formattedStartDate} al ${formattedEndDate}`
}