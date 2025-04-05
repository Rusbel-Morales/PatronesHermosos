import { createListCollection } from "@chakra-ui/react";

export const escolaridades = createListCollection({
  items: [
    { label: "Secundaria", value: "Secundaria" },
    { label: "Preparatoria", value: "Preparatoria" },
  ],
});

export const idiomas = createListCollection({
  items: [
    { label: "Inglés", value: "Inglés" },
    { label: "Español", value: "Español" },
  ],
});

export const niveles = createListCollection({
  items: [
    { label: "Básico", value: "Básico" },
    { label: "Avanzado", value: "Avanzado" },
  ],
});

export const roles = createListCollection({
  items: [
    { label: "Facilitadora", value: "Facilitadora" },
    { label: "Instructora", value: "Instructora" },
    { label: "Staff", value: "Staff" },
  ],
});

export const fechas = createListCollection({
  items: [
    { label: "07/07/2025", value: "2025-07-07" },
    { label: "14/07/2025", value: "2025-07-14" },
    { label: "21/07/2025", value: "2025-07-21" },
  ],
});