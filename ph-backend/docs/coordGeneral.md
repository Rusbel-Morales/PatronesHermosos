# Documentación de Endpoints - Coordinadora General (/coordGeneral)

---

## **1. Inicio de Sesión**

### **POST /coordGeneral/login**

Este endpoint permite el acceso al panel principal (dashboard) de la Coordinadora General, así como obtener su nombre.

### **Parámetros**

La solicitud debe enviarse en formato JSON con los siguientes campos:

```json
{
    "username": "(correo correspondiente)",
    "password": "(password correspondiente)"
}
```

### **Respuesta Exitosa (200 OK)**

Si las credenciales son correctas, el servidor responderá con un token de autenticación:

```json
{
    "message": "Inicio de sesión exitoso",
    "nombre": "nombre...",
    "token": "token..."
}
```

### **Códigos de Estado en Caso de Error**

#### **500 - Error Interno del Servidor**

Si ocurre un error inesperado, la respuesta será:

```json
{
    "error": "Descripción del servidor..."
}
```

El servidor ha encontrado una situación que no puede manejar. Se recomienda contactar al desarrollador backend.

#### **404 - Usuario No Encontrado**

Si el usuario proporcionado no existe, se retornará el siguiente mensaje:

```json
{
    "error": "El usuario ingresado no existe"
}
```

#### **401 - Contraseña Incorrecta**

Si la contraseña ingresada no es válida, la respuesta será:

```json
{
    "error": "Credenciales inválidas"
}
```

---

## **2. Cierre de Sesión**

### **PATCH /coordGeneral/logout**

Este endpoint permite a la Coordinadora General cerrar sesión de manera segura, invalidando el token de autenticación.

### **Parámetros**

Debe enviarse un encabezado (header) en la solicitud para evitar exponer el token:

```json
headers: {
    "Authorization": "Bearer (aquí va el token)"
}
```

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, se retornará el siguiente mensaje:

```json
{
    "message": "Cierre de sesión exitoso"
}
```

### **Códigos de Estado en Caso de Error**

#### **500 - Error Interno del Servidor**

Si el servidor encuentra un problema inesperado, responderá con:

```json
{
    "error": "Descripción del servidor..."
}
```

Ante este escenario, se recomienda contactar al desarrollador backend.

#### **401 - Token no proporcionado**

Si la solicitud no incluye un token de autenticación, el servidor responderá con:

```json
{
    "error": "No se proporcionó un token"
}
```

---