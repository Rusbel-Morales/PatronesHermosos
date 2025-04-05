import supabase from "../../config/database.js";

/**
 * Insert a new mentora into the database
 * @param {Object} mentora - The mentora object to be inserted
 * @param {string} mentora.nombre - The name of the mentora
 * @param {string} mentora.correo - The email of the mentora
 * @param {number} mentora.id_grupo - The id of the grupo where the mentora is assigned
 * @param {number} mentora.id_coord_sede - The id of the sede coordSede
 * @returns {Promise<Object>} The object data or an error object
 */

async function createMentora(mentora) {
    const { data, error } = await supabase
        .from("mentora")
        .insert(mentora);

    return (data) ? data : error;
}

export { createMentora };