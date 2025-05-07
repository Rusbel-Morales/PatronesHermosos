# Documentación de Endpoints - Sedes (/sedes)

## 1. POST /sedes/registro

Este endpoint permite el registro de una sede, junto con la coordinadora de sede y los grupos asociados. Además, maneja la carga de un archivo PDF con la convocatoria firmada.

### **Parámetros**
Este endpoint requiere un formulario con los siguientes datos:

#### **Cuerpo de la solicitud (multipart/form-data)**
- `data` (string, requerido): JSON que contiene los datos de la coordinadora de sede y la sede. La estructura es la siguiente:

  ```json
  {
      "coordSede": {
          "nombre": "María González",
          "correo": "maria.gonzalez@example.com",
          "telefono": "5544332211"
      },
      "sede": {
          "nombre_sede": "Tec Campus Guadalajara",
          "fecha_inicio": "2025-04-01",
          "num_grupos_sede": 5
      }
  }
  ```
- `convocatoria_firmada` (file, requerido): Archivo en formato PDF que contiene la convocatoria firmada.

### **Respuesta Exitosa (201 Created)**
Si el registro es exitoso, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "message": "Sede, coordinadora de sede y grupos de la sede registradas con éxito"
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
- "Faltan datos de la coordinadora de sede"
- "Faltan datos de la sede"
- "No se subió el archivo"

### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## 2. GET /sedes/obtenerSedes

Este endpoint permite obtener la lista de todas las sedes disponibles junto con su identificador único.

### **Parámetros**
Este endpoint no requiere parámetros.

### **Respuesta Exitosa (200 OK)**
Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
[
    {
        "id_sede": 19,
        "nombre_sede": "Tec Campus Puebla"
    },
    {
        "id_sede": 21,
        "nombre_sede": "Tec Santa Fe"
    },
    {
        "id_sede": 20,
        "nombre_sede": "Tec Campus Toluca"
    },
    {
        "id_sede": 27,
        "nombre_sede": "Tec Campus Monterrey"
    }
]
```

---

## 3. Códigos de Estado en Caso de Error

### **400 - Solicitud Incorrecta**
Si falta algún dato obligatorio en la solicitud, el servidor responderá con:

```json
{
    "error": "Mensaje de error específico"
}
```

#### **Posibles errores:**
- "Faltan datos de la coordinadora de sede"
- "Faltan datos de la sede"
- "No se subió el archivo"

### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## GET /sedes/obtenerTodaInfoSedes

Este endpoint permite obtener la lista completa de todas las sedes junto con información detallada, incluyendo su estado, fechas importantes, datos del coordinador y estadísticas de participantes y grupos.

### **Parámetros**
Este endpoint no requiere parámetros.

### **Respuesta Exitosa (200 OK)**
Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
[
    {
        "id_sede": 95,
        "nombre_sede": "Tec Campus Puebla",
        "estado": "aceptado",
        "fecha_solicitud": "2025-04-09",
        "fecha_inicio": "2025-07-14",
        "coord_sede": {
            "correo": "rusbelmorales@gmail.com",
            "nombre": "Alejandro Morales"
        },
        "mentora": [
            "Alejandro",
            "Alejandro Méndez",
            "Carlos",
            "Diego Insano",
            "donatelo@gmail.com",
            "fernanda",
            "Gadiro",
            "Javier Antonio",
            "lolo",
            "mamasita",
            "Maria LOLA",
            "miguel",
            "miguelan",
            "Olmos",
            "papanicolao",
            "paquita",
            "Pedri ",
            "qqq",
            "Rosa Paredes",
            "rosi",
            "Rusbel"
        ]
    },
    {
        "id_sede": 96,
        "nombre_sede": "Tec Campus Toluca",
        "estado": "rechazado",
        "fecha_solicitud": "2025-04-09",
        "fecha_inicio": "2025-07-07",
        "coord_sede": {
            "correo": "julieta@gmail.com",
            "nombre": "Julieta García"
        },
        "mentora": []
    }
]
```

### **Códigos de Estado en Caso de Error**

### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## **POST /sedes/:id/aceptar**

Este endpoint permite aceptar una sede específica.

### **Parámetros**
- `id` (path): Identificador único de la sede a aceptar.

### **Respuesta Exitosa (200 OK)**
```json
{
    "message": "Sede aprobada con éxito"
}
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si el id de la sede no se proporciona en la solicitud:
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

---

## **POST /sedes/:id/rechazar**

Este endpoint permite rechazar una sede específica.

### **Parámetros**
- `id` (path): Identificador único de la sede a rechazar.

### **Respuesta Exitosa (200 OK)**
```json
{
    "message": "Sede rechazada con éxito"
}
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si el id de la sede no se proporciona en la solicitud:
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

---

## **GET /sedes/:id/detalles**

Este endpoint permite obtener los detalles completos de una sede específica.

### **Parámetros**

- `id` (string) - Identificador único de la sede.

### **Ejemplo de solicitud**

```http
GET /sedes/123/detalles
```

### **Respuesta Exitosa (200 OK)**

```json
{
    "nombre": "Rusbel Alejandro Morales Méndez",
    "correo": "rusbelalejandrom@gmail.com",
    "sede": {
        "estado": "(pendiente | aceptado | rechazado)",
        "nombre_sede": "Tec Campus Monterrey",
        "fecha_inicio": "2025-07-07",
        "fecha_solicitud": "2025-04-02"
    }
}
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si no se proporciona un `id`, se enviará la siguiente respuesta:

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

## **GET /sedes/:id/descargar-convocatoria-sede**

Este endpoint permite a la **Coordinadora General** descargar el archivo PDF de la convocatoria correspondiente a una sede específica.

### **Parámetros**

- `id` (entero, requerido): Identificador único de la sede cuya convocatoria se desea descargar.

### **Encabezados Requeridos**

Debe enviarse un encabezado en la solicitud para autenticar al usuario:

```json
{
    "Authorization": "Bearer (aquí va el token)"
}
```

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un archivo en formato PDF.

**Ejemplo de encabezado de respuesta:**

```http
Content-Type: application/pdf
Content-Length: (tamaño del archivo en bytes)
```

### **Códigos de Estado en Caso de Error**

#### **401 - No Autorizado**
Si no se proporciona un token válido:

```json
{
    "error": "No se proporcionó un token"
}
```

#### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado al descargar la convocatoria:

```json
{
    "error": "Error al descargar el archivo pdf de la convocatoria de la sede: (mensaje del error)"
}
```

## Gestión de Postulaciones

### **POST /sedes/:id_aplicante/postulaciones/aceptar**

Este endpoint permite aceptar la postulación de una aplicante.

#### **Parámetros**

- `id_aplicante` (path, requerido): Identificador único de la aplicante.

##### **Cuerpo de la solicitud (application/json)**

```json
{
  "rol": "Mentora",
  "nombre": "Carolina Pérez",
  "correo": "carolina.perez@example.com"
}
```

#### **Respuesta Exitosa (200 OK)**

```json
{
  "message": "Postulación aceptada con éxito"
}
```

#### **Códigos de Estado en Caso de Error**

##### **400 - Solicitud Incorrecta**

```json
{
  "error": "Faltan campos obligatorios o el formato es incorrecto"
}
```

##### **500 - Error Interno del Servidor**

```json
{
  "error": "Error interno al procesar la postulación"
}
```

### **POST /sedes/:id_aplicante/postulaciones/rechazar**

Este endpoint permite rechazar la postulación de una aplicante.

#### **Parámetros**

- `id_aplicante` (path, requerido): Identificador único de la aplicante.

##### **Cuerpo de la solicitud (application/json)**

```json
{
  "rol": "Facilitadora",
  "nombre": "Ana López",
  "correo": "ana.lopez@example.com"
}
```

#### **Respuesta Exitosa (200 OK)**

```json
{
  "message": "Postulación rechazada con éxito"
}
```

#### **Códigos de Estado en Caso de Error**

##### **400 - Solicitud Incorrecta**

```json
{
  "error": "Faltan campos obligatorios o el formato es incorrecto"
}
```

##### **500 - Error Interno del Servidor**

```json
{
  "error": "Error interno al procesar la postulación"
}
```