# Documentación de Endpoints - Mentora (/mentora)

## **1. Registro de Mentora**

### **POST /mentora/registro**

Este endpoint permite registrar a una nueva mentora en el sistema, asociándola a una sede específica.

### **Parámetros**

La solicitud debe enviarse en formato JSON con los siguientes campos:

```json
{
    "mentora": {
        "nombre": "(nombre de la mentora)",
        "correo": "(correo de la mentora)",
    },
    "id_sede": "(id de la sede)"
}
```

### **Respuesta Exitosa (201 Created)**

Si la solicitud es exitosa, se retornará el siguiente mensaje:

```json
{
    "message": "Mentora registrada con éxito"
}
```

### **Códigos de Estado en Caso de Error**

#### **400 - Solicitud Incorrecta**

Si faltan datos de la mentora, se enviará un mensaje de error específico.

```json
{
    "error": "Faltan datos de la mentora"
}
```

Si falta el id de la sede, se enviará un mensaje de error específico.

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