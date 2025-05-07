  # Documentación de Endpoints - Personal (/personal)

## 1. POST /personal/registro

Este endpoint permite el registro de personal en la base de datos, asociándolo a una sede específica.

### **Parámetros**
Este endpoint requiere un JSON en el cuerpo de la solicitud con los siguientes datos:

#### **Cuerpo de la solicitud (application/json)**
```json
{
    "personal": {
        "nombre": "Ana López",
        "correo": "ana.lopez@example.com",
        "universidad_origen": "UNAM",
        "carrera": "Ingeniería en Computación",
        "idioma_preferencia": "Inglés",
        "nivel_preferencia": "Avanzado",
        "rol_preferencia": "Staff"
    },
    "sede": {
        "id_sede": 3
    }
}
```

### **Respuesta Exitosa (201 Created)**
Si el registro es exitoso, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "message": "Personal registrado con éxito"
}
```

---

## 2. Códigos de Estado en Caso de Error

### **400 - Solicitud Incorrecta**
Si falta algún dato obligatorio en la solicitud, el servidor responderá con:

```json
{
    "error": "Mensaje de error específico"
}
```

#### **Posibles errores:**
- "Faltan datos del personal"
- "Falta el id de la sede"

### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## **GET /personal/usuariosEstadoRol**

Este endpoint permite obtener el número de usuarios según el estado y rol asociados a una sede específica.

### **Parámetros (query)**

- `id_sede` (entero, requerido): Identificador único de la sede.  
  Se debe enviar como query parameter en la URL, por ejemplo:  
  `/personal/usuariosEstadoRol?id_sede=123`

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "staff": {
        "aceptados": 0,
        "pendientes": 0
    },
    "instructoras": {
        "aceptadas": 0,
        "pendientes": 0
    },
    "facilitadoras": {
        "aceptadas": 0,
        "pendientes": 0
    },
    "participantes": {
        "aceptadas": 1,
        "pendientes": 2
    }
}
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si no se proporciona un `id_sede`, se enviará la siguiente respuesta:

```json
{
    "error": "Id de sede no proporcionado"
}
```

#### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## **GET /personal/totalPersonalPorRol**

Este endpoint permite obtener el total de personal por rol asociado a una sede específica.

### **Parámetros (query)**

- `id_sede` (string, requerido): Identificador único de la sede.  
  Se debe enviar como query parameter en la URL, por ejemplo:  
  `/personal/obtenerTotalUsuariosRol?id_sede=abc123`

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "total_instructoras": 0,
    "total_facilitadoras": 1,
    "total_staffs": 1,
    "total_mentoras": 1
}
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si no se proporciona un `id_sede`, se enviará la siguiente respuesta:

```json
{
    "error": "Id de sede no proporcionado"
}
```

#### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## **GET /personal/listar**

Este endpoint permite listar el personal asociado a una sede específica, incluyendo información como su rol, estado, idioma, nivel, universidad de origen, carrera y fecha de envío del formulario.

### **Parámetros (query)**

- `id_sede` (entero, requerido): Identificador único de la sede.  
  Se debe enviar como query parameter en la URL, por ejemplo:  
  `/personal/listar?id_sede=123`

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:
```json
[
    {
        "id_personal": 1,
        "nombre": "Diego Lopez Romero",
        "correo": "diegotec@tec.mx",
        "rol_preferencia": "Staff",
        "idioma_preferencia": "Español",
        "nivel_preferencia": "Básico",
        "estado": "aceptado",
        "universidad_origen": "UNAM",
        "carrera": "Ingeniería en Computación",
        "fecha_formulario": "2025-04-16"
    },
    {
        "id_personal": 9,
        "nombre": "Hector Solorzano",
        "correo": "solorzano@gmail.com",
        "rol_preferencia": "Facilitadora",
        "idioma_preferencia": "Inglés",
        "nivel_preferencia": "Avanzado",
        "estado": "aceptado",
        "universidad_origen": "IPN",
        "carrera": "Pedagogía",
        "fecha_formulario": "2025-04-16"
    },
    {
        "id_personal": 10,
        "nombre": "Maria Candelaria",
        "correo": "maria@gmail.com",
        "rol_preferencia": "Instructora",
        "idioma_preferencia": "Español",
        "nivel_preferencia": "Básico",
        "estado": "pendiente",
        "universidad_origen": "UAM",
        "carrera": "Psicología",
        "fecha_formulario": "2025-04-16"
    }
]
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si no se proporciona un `id_sede`, se enviará la siguiente respuesta:

```json
{
    "error": "Id de sede no proporcionado"
}
```

#### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.