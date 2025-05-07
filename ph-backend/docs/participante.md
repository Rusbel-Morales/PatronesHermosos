# Documentación de Endpoints - Participantes (/participantes)

## 1. POST /participantes/registro

Este endpoint permite el registro de un participante junto con su tutor en la base de datos. Además, maneja la carga de un archivo PDF de permiso del tutor.

### **Parámetros**
Este endpoint requiere un formulario con los siguientes datos:

#### **Cuerpo de la solicitud (form-data)**
- `data` (string, requerido): JSON que contiene los datos del participante, tutor y sede. La estructura es la siguiente:
  ```json
  {
      "participante": {
          "nombre": "Juan Pérez",
          "correo": "juan.perez@example.com",
          "edad": 16,
          "escolaridad": "Preparatoria",
          "idioma_preferencia": "Inglés",
          "grado": "2"
      },
      "tutor": {
          "nombre": "Carlos Pérez",
          "correo": "carlos.perez@example.com",
          "telefono": "5512345678"
      },
      "sede": {
          "id_sede": 1,
          "nombre_sede": "Tec Campus Monterrey"
      }
  }
  ```
- `permiso_tutor` (file, requerido): Archivo en formato PDF que contiene el permiso del tutor.

### **Respuesta Exitosa (201 Created)**
Si el registro es exitoso, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "message": "Participante y tutor registrado con éxito"
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
- "Faltan datos del participante"
- "Faltan datos del tutor"
- "Falta el nombre de la sede"
- "No se subió el archivo"

### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

## 2. GET /participantes/listar

Este endpoint permite obtener la lista de participantes registrados en una sede específica.

### **Parámetros**
Este endpoint requiere los siguientes parámetros:

#### **Query Parameters**
- `id_sede` (integer, requerido): El identificador único de la sede para la cual se desea obtener la lista de participantes.

### **Respuesta Exitosa (200 OK)**
Si la solicitud es exitosa, el servidor responderá con un arreglo de objetos JSON que representan a los participantes registrados en la sede especificada. Cada objeto tiene la siguiente estructura:

#### **Ejemplo de Respuesta**
```json
[
    {
        "id_participante": 1,
        "nombre": "Sofia Guadalupe",
        "correo": "gudalupe@gmail.com",
        "edad": 16,
        "escolaridad": "Preparatoria",
        "grado": "2",
        "estado": "aceptado"
    },
    {
        "id_participante": 2,
        "nombre": "Maria Solorzano",
        "correo": "maria@gmail.com",
        "edad": 14,
        "escolaridad": "Preparatoria",
        "grado": "2",
        "estado": "aceptado"
    },
    {
        "id_participante": 3,
        "nombre": "Fernando Maggi Llerandi",
        "correo": "maggi@gmail.com",
        "edad": 13,
        "escolaridad": "Secundaria",
        "grado": "2",
        "estado": "aceptado"
    },
    {
        "id_participante": 4,
        "nombre": "Diego Messi",
        "correo": "messi@gmail.com",
        "edad": 12,
        "escolaridad": "Secundaria",
        "grado": "1",
        "estado": "aceptado"
    }
]
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**
Si falta el parámetro `id_sede`, el servidor responderá con:

```json
{
    "error": "Id de sede no proporcionado"
}
```

#### **404 - No Encontrado**
Si no se encuentran participantes registrados para la sede especificada, el servidor responderá con:

```json
{
    "message": "No se encontraron participantes para esta sede"
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

## 3. GET /participantes/:id/descargar-permiso-tutor

Este endpoint permite a la **Coordinadora de Sede** descargar el archivo PDF de permiso del tutor para un participante específico.

### **Parámetros**

- `id` (integer, requerido): El identificador único del participante para el cual se desea descargar el archivo PDF de permiso del tutor.

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

#### **401 - Token inválido**
Si el token proporcionado no es válido, el servidor responderá con:

```json
{
    "error": "Token inválido"
}
```

#### **500 - Error Interno del Servidor**
Si ocurre un problema inesperado al descargar el archivo PDF de permiso del tutor:

```json
{
    "error": "Error al descargar el archivo pdf del permiso del tutor: (mensaje del error)"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.