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

