# Documentación de Endpoints - Administración (/administration)

---

## **1. Inicio de Sesión**

### **POST /administration/login**

Este endpoint permite el acceso al panel principal (dashboard) de la **Coordinadora General** y la **Coordinadora de Sede**, además de obtener su nombre y token de autenticación, necesario para futuras peticiones protegidas.

---

### **Parámetros**

La solicitud debe enviarse en formato JSON con los siguientes campos:

```json
{
    "username": "(correo correspondiente)",
    "password": "(password correspondiente)"
}
```

---

### **Respuesta Exitosa (200 OK)**

Si las credenciales son correctas, el servidor responderá con un objeto JSON que contiene:

- `message`: Mensaje indicando éxito en el inicio de sesión.
- `nombre`: Nombre completo de la usuaria.
- `token`: Token JWT para autenticación.
- `rol`: Rol de la usuaria (`coord_general` o `coord_sede`).
- `sedeData` *(opcional)*: Solo se incluye si el rol es `coord_sede`, y contiene:
  - `id_sede`: Identificador de la sede.
  - `nombre_sede`: Nombre de la sede.
  - `fecha_inicio`: Fecha de inicio de la sede

#### **Ejemplo de Respuesta para Coordinadora de Sede**

```json
{
    "message": "Inicio de sesión exitoso",
    "nombre": "Rusbel",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ1c2JlbG1vcmFsZXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiJSVVNQNEIzenFJTmY1bSIsInJvbCI6ImNvb3JkX3NlZGUiLCJ0b2tlblRhYmxlIjoidG9rZW5fY29vcmRfc2VkZSIsImlhdCI6MTc0NDgyMjg3MX0.c1QLYfJ1EPDm10lScmND7ECkfPrBedTJ4eIAAynfz_Q",
    "rol": "coord_sede",
    "sedeData": {
        "id_sede": 95,
        "nombre_sede": "Tec Campus Puebla"
    }
}
```

#### **Ejemplo de Respuesta para Coordinadora General**

```json
{
  "message": "Inicio de sesión exitoso",
  "nombre": "Rusbel Morales",
  "token": "(aquí va el token)",
  "rol": "coord_general"
}
```

> **Nota:** El campo `id_sede` no se incluye en la respuesta de una Coordinadora General.

---

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

### **PATCH /administration/logout**

Este endpoint permite a la Coordinadora General y Coordinadora de Sede cerrar sesión de manera segura, invalidando el token de autenticación.

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

#### **401 - Token no proporcionado**

Si la solicitud no incluye un token de autenticación, el servidor responderá con:

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

Si el servidor encuentra un problema inesperado, responderá con:

```json
{
    "error": "Descripción del servidor..."
}
```

Ante este escenario, se recomienda contactar al desarrollador backend.

---

## **3. Eliminar Datos de la Base de Datos**

### **DELETE /administration/deleteData**

Este endpoint permite eliminar todos los datos de la base de datos. Está diseñado para pueda ser utilizado únicamente por la **Coordinadora General**.

---

### **Parámetros**

La solicitud debe enviarse en formato JSON con los siguientes campos:

```json
{
    "password": "(contraseña administrativa)"
}
```

---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, se retornará el siguiente mensaje:

```json
{
    "message": "Base de datos eliminada exitosamente."
}
```

---

### **Códigos de Estado en Caso de Error**

#### **401 - Contraseña incorrecta**

Si la contraseña administrativa proporcionada es incorrecta, se retornará el siguiente mensaje:

```json
{
    "error": "Contraseña incorrecta"
}
```

#### **500 - Error Interno del Servidor**

Si ocurre un error inesperado, la respuesta será:

```json
{
    "error": "Descripción del servidor..."
}
```

El servidor ha encontrado una situación que no puede manejar. Se recomienda contactar al desarrollador backend.

## **4. Crear Estadísticas**

### **GET /administration/crearEstadisticas**

Este endpoint permite generar y descargar un archivo CSV con estadísticas detalladas de todas las sedes, incluyendo información sobre el personal y participantes.

---

### **Parámetros**

Este endpoint no requiere parámetros.

---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un archivo CSV que contiene las siguientes columnas:

- `Sede`: Nombre de la sede
- `Instructoras`: Número de instructoras por sede
- `Facilitadoras`: Número de facilitadoras por sede
- `Staff`: Número de staff por sede
- `Mentoras`: Número de mentoras por sede
- `Coordinadoras asociadas`: Número de coordinadoras asociadas por sede
- `Participantes`: Número de participantes por sede
- `Total por sede`: Total de personas por sede

El archivo incluirá una fila final con los totales globales de cada rol.

El nombre del archivo seguirá el formato: `estadisticas_YYYY-MM-DD.csv`

#### **Ejemplo de Contenido del CSV**

```csv
Sede,Instructoras,Facilitadoras,Staff,Mentoras,Coordinadoras asociadas,Participantes,Total por sede
Tec Campus Puebla,2,3,1,2,1,15,24
Tec Campus Monterrey,1,2,1,1,1,10,16
Totales,3,5,2,3,2,25,40
```

---

### **Códigos de Estado en Caso de Error**

#### **500 - Error Interno del Servidor**

Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
    "error": "Mensaje de error específico"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución. 