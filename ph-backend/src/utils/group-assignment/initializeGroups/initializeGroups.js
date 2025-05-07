function initializeGroups(grupos) {
    return grupos.map(g => ({
        ...g,
        cupo_actual: 0,
        inscritos: {
            participante: [],
            instructora: [],
            facilitadora: [],
            staff: [],
            mentora: []
        }
    }));
}

module.exports = initializeGroups;