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
        "rol_preferencia": "Mentora"
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

