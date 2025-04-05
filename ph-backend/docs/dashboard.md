# Documentación de Endpoints - Dashboard (/dashboard)

## 1. GET /dashboard/overview

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
            "id_sede": 11,
            "nombre_coord_sede": "Rusbel Morales",
            "nombre_sede": "Tec Campus Toluca",
            "fecha_solicitud": "2025-03-24"
        },
        {
            "id_sede": 15,
            "nombre_coord_sede": "Diego Javier",
            "nombre_sede": "Tec Santa Fe",
            "fecha_solicitud": "2025-03-25"
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

## 2. Códigos de Estado en Caso de Error

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