// utils/hasCupoDisponible.js
module.exports = (grupo) => grupo.inscritos.participante.length < grupo.cupo_max;