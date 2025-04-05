// database.js
// Configuración de la conexión a la base de datos MySQL.

const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js"); // Extract named export

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;