# Documentación de Endpoints - Dashboard (/dashboard)

## 1. GET /dashboard/coordGeneralOverview

Este endpoint proporciona un resumen general del dashboard de la Coordinadora General, incluyendo información sobre sedes pendientes, el estado de las sedes, ranking de las sedes con mayor número de participantes y el número de sedes que se registraron desde la última vez que la coordinadora general cerró sesión.

### **Parámetros**
Este endpoint no requiere parámetros.

### **Respuesta Exitosa (200 OK)**
Si la solicitud es exitosa, el servidor responderá con un JSON que contiene la siguiente información:

#### **Estructura de la respuesta:**
```json
{
    "obtenerSedesPendientes": [
        {
            "id_sede": 92,
            "nombre_coord_sede": "Itzell Diaz",
            "correo_coord_sede": "a01737290@tec.mx",
            "nombre_sede": "TEC Campus Misantla",
            "estado": "pendiente",
            "fecha_solicitud": "2025-04-07",
            "fecha_inicio": "2025-07-07"
        },
        {
            "id_sede": 93,
            "nombre_coord_sede": "Maria Gonzalez",
            "correo_coord_sede": "maria@example.com",
            "nombre_sede": "TEC Campus CCM",
            "estado": "pendiente",
            "fecha_solicitud": "2025-04-07",
            "fecha_inicio": "2025-07-07"
        }
    ],
    "obtenerSedesEstado": [
        {
            "total_sedes": 2,
            "estado": "(pendiente | aceptado | rechazado)"
        },
        {
            "total_sedes": 1,
            "estado": "(pendiente | aceptado | rechazado)"
        }
    ],
    "obtenerTopSedes": [
        {
            "total_participantes": 2,
            "nombre_sede": "Tec Campus Toluca"
        },
        {
            "total_participantes": 1,
            "nombre_sede": "Tec Santa Fe"
        }
    ], 
    "numeroSolicitudesSedes": 0
}
```

### **Descripción de los Datos:**
- `obtenerSedesPendientes`: Lista de sedes cuya solicitud está pendiente, incluyendo el nombre del coordinador, el nombre de la sede y la fecha de la solicitud.
- `obtenerSedesEstado`: Resumen del número total de sedes en cada estado (ejemplo: "pendiente", "aceptado" y "rechazado").
- `obtenerTopSedes`: Ranking de sedes basado en la cantidad de participantes registrados.

---

## Códigos de Estado en Caso de Error

### **500 - Error Interno del Servidor**
Si el servidor encuentra un problema inesperado, responderá con un JSON en el siguiente formato:

#### **Estructura de la respuesta:**
```json
{
    "error": "Mensaje de error específico"
}
```

#### **Descripción:**
Este error indica que el servidor ha encontrado una situación que no puede manejar. En caso de recibir este error, se recomienda contactar al equipo de desarrollo backend responsable de este feature para una pronta resolución.


## 2. GET /dashboard/coordSedeOverview

Este endpoint permite obtener un **resumen general del estado de los usuarios asociados a una sede específica**.  
La respuesta incluye:

- Total del personal según Estado y rol (aceptados y pendientes).
- Total de personal por rol (**SOLO** Aceptada), incluyendo a Mentora.
- Total de participantes según su estado (aceptadas y pendientes).
- Total de solicitudes pendientes de aprobación (participantes y personal).
- Datos de los participantes pendientes de aprobación.
- Datos de los personal pendientes de aprobación.

---

### **Parámetros (query)**

- `id_sede` (entero, requerido): Identificador único de la sede.  
  Se debe enviar como query parameter en la URL.  
  **Ejemplo:**  
  `/dashboard/coordSedeOverview?id_sede=123`

---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON que contiene tres bloques de información:

```json
{
    "usuariosEstadoRol": {
        "staff": {
            "aceptados": 1,
            "pendientes": 3
        },
        "instructoras": {
            "aceptadas": 0,
            "pendientes": 1
        },
        "facilitadoras": {
            "aceptadas": 0,
            "pendientes": 2
        }
    },
    "totalPersonalRol": {
        "total_instructoras": 0,
        "total_facilitadoras": 0,
        "total_staffs": 1,
        "total_mentoras": 2
    },
    "participantesPorEstado": {
        "total_aceptadas": 3,
        "total_pendientes": 3
    },
    "numSolicitudes": {
        "participantes": 0,
        "personal": 0
    },
    "participantesPendientes": [
        {
            "id_participante": 3,
            "nombre": "Fernando Maggi Llerandi",
            "correo": "maggi@gmail.com",
            "edad": 15,
            "escolaridad": "Preparatoria",
            "grado": "1",
            "fecha_formulario": "2025-04-11",
            "tutor": {
                "nombre": "Armando Maggi Consejo"
            },
            "sede": {
                "nombre_sede": "Tec Campus Puebla"
            }
        }
    ],
    "personalPendiente": [
        {
            "id_personal": 11,
            "nombre": "Diego Simba",
            "correo": "simba@gmail.com",
            "universidad_origen": "Tecnologico de Monterrey",
            "carrera": "Ingenieria en Sistemas Computacionales",
            "idioma_preferencia": "Inglés",
            "nivel_preferencia": "Avanzado",
            "rol_preferencia": "Staff",
            "fecha_formulario": "2025-04-16",
            "sede": {
                "nombre_sede": "Tec Campus Puebla"
            }
        }
    ]
}
```

---

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si no se proporciona el parámetro `id_sede`, el servidor responderá con:

```json
{
  "error": "Id de sede no proporcionado"
}
```

---

#### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
  "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.