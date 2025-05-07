function splitPersonal(colaboradoras) {
    // Inicializar arreglos de instructoras, facilitadoras y staff
    const instructora = [];
    const facilitadora = [];
    const staff = [];

    colaboradoras.forEach(({ rol_preferencia, ...rest }) => {
        switch (rol_preferencia) {
            case "Instructora": 
                instructora.push({ ...rest });
                break;
            case "Facilitadora":
                facilitadora.push({ ...rest });
                break;
            default:
                staff.push({ ...rest });
                break;
        }
    });

    return { instructora, facilitadora, staff };
}

module.exports = splitPersonal;