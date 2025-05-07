# Documentación de Endpoints - Grupo (/grupos)

## 1. Obtener grupos de una sede

### **GET /grupos/obtener-grupos-sede**

Este endpoint permite obtener los grupos de una sede específica.

---

### **Parámetros (query)**

- `id_sede` (entero, requerido): Identificador único de la sede.  
  Se debe enviar como query parameter en la URL, por ejemplo:  
  `/grupos/obtener-grupos-sede?id_sede=123`

---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "grupos": [
        {
            "id_grupo": 155,
            "idioma": "Español",
            "nivel": "Avanzado",
            "cupo_max": 20,
            "cupo_actual": 2,
            "inscritos": {
                "staff": [
                    {
                        "nombre": "Carlos",
                        "id_personal": 17,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ],
                "mentora": [
                    {
                        "nombre": "Alejandro",
                        "id_mentora": 1
                    }
                ],
                "instructora": [
                    {
                        "nombre": "Hector Solorzano",
                        "id_personal": 9,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ],
                "facilitadora": [
                    {
                        "nombre": "Hector CRACK",
                        "id_personal": 19,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    },
                    {
                        "nombre": "Maria DB",
                        "id_personal": 20,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ],
                "participante": [
                    {
                        "nombre": "Fernando Maggi Llerandi",
                        "id_participante": 3,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    },
                    {
                        "nombre": "Sofia Guadalupe ",
                        "id_participante": 1,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ]
            }
        }
    ],
    "usuariosSinGrupo": {
        "participante": [
            {
                "id_participante": 2,
                "nombre": "Maria Solorzano",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_participante": 4,
                "nombre": "Diego Messi",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_participante": 5,
                "nombre": "Aurelia Antonia",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_participante": 6,
                "nombre": "Maraly Trinidad",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_participante": 11,
                "nombre": "Juan Pérez",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_participante": 12,
                "nombre": "Mac Antonio",
                "idioma": "Español",
                "nivel": "Básico"
            }
        ],
        "instructora": [
            {
                "id_personal": 10,
                "nombre": "Maria Candelaria",
                "idioma": "Español",
                "nivel": "Avanzado"
            }
        ],
        "facilitadora": [
            {
                "id_personal": 12,
                "nombre": "Mara Solorzano",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_personal": 11,
                "nombre": "Diego Simba",
                "idioma": "Español",
                "nivel": "Básico"
            }
        ],
        "staff": [
            {
                "id_personal": 22,
                "nombre": "Steren",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_personal": 21,
                "nombre": "Maria Oracle",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_personal": 1,
                "nombre": "Diego Lopez Romero",
                "idioma": "Español",
                "nivel": "Avanzado"
            }
        ],
        "mentora": [
            {
                "id_mentora": 7,
                "nombre": "Carlos"
            },
            {
                "id_mentora": 8,
                "nombre": "Rosa Paredes"
            }
        ]
    }
}
```

### **Errores**

#### **400 - Solicitud Inválida**

Si no se proporciona el parámetro `id_sede`, el servidor responderá con un JSON en el siguiente formato:

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

---

## 2. Registro de Grupos

### **POST /grupos/registro**

Este endpoint permite registrar uno o más grupos para una sede específica.

---

### **Parámetros (body)**

La solicitud debe enviarse en formato JSON con los siguientes campos:

```json
{
  "id_sede": 95,
  "grupos": [
    {
      "idioma": "Español",
      "nivel": "Básico",
      "cupo_max": 30
    },
    {
      "idioma": "Inglés",
      "nivel": "Avanzado",
      "cupo_max": 25
    }
  ]
}
```

---

### **Respuesta Exitosa (201 Created)**

Si la solicitud es exitosa, el servidor responderá con un código de estado `201 Created` y un cuerpo JSON como el siguiente:

```json
{
  "message": "Grupos registrados con éxito"
}
```

---

### **Errores**

#### **500 Internal Server Error**

Si ocurre un error, el servidor responderá con un código de estado `500 Internal Server Error` y un cuerpo JSON como el siguiente:

```json
{
  "error": "Descripción del error ocurrido"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

---

## 3. Actualizar Grupos

### **PATCH /grupos/actualizar-grupos-sede**

Este endpoint permite actualizar los datos de uno o más grupos de una sede específica, como participantes, instructores, facilitadores, staff y mentoras, así como el idioma, nivel y cupo máximo. Además, permite actualizar los usuarios que no están asignados a ningún grupo.

---

### **Parámetros (body)**
La solicitud debe enviarse en formato JSON con un array de objetos que contengan las actualizaciones para cada grupo. Cada objeto debe incluir:

- `id_grupo` (entero, requerido): Identificador único del grupo que se desea actualizar.
- Campos a actualizar (opcional):
    - `idioma` (string): Idioma del grupo, puede ser "Español" o "Inglés".
    - `nivel` (string): Nivel del grupo, puede ser "Básico" o "Avanzado".
    - `cupo_max` (entero): Número máximo de participantes, debe ser mayor o igual a 5.
    - `inscritos` (objeto, opcional): Contiene las listas de usuarios asignados al grupo, organizados por roles:
        - `participante` (array de objetos): Lista de participantes con sus identificadores y nombres.
        - `instructora` (array de objetos): Lista de instructores asignados al grupo.
        - `facilitadora` (array de objetos): Lista de facilitadores asignados al grupo.
        - `staff` (array de objetos): Lista de personal asignado al grupo.
        - `mentora` (array de objetos): Lista de mentoras asignados al grupo.

Además, se puede un objeto `usuariosSinGrupo` para actualizar la lista de usuarios que no están asignados a ningún grupo. Este objeto puede contener las siguientes propiedades opcionales:

- `participante` (array de objetos): Lista de participantes sin grupo.
- `instructora` (array de objetos): Lista de instructores sin grupo.
- `facilitadora` (array de objetos): Lista de facilitadores sin grupo.
- `staff` (array de objetos): Lista de personal sin grupo.
- `mentora` (array de objetos): Lista de mentoras sin grupo.

```json
{
    "grupos": [
        {
            "id_grupo": 155,
            "idioma": "Español",
            "nivel": "Avanzado",
            "cupo_max": 20,
            "inscritos": {
                "staff": [
                    {
                        "nombre": "Carlos",
                        "id_personal": 17,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ],
                "mentora": [
                    {
                        "nombre": "Alejandro",
                        "id_mentora": 1
                    }
                ],
                "instructora": [
                    {
                        "nombre": "Hector Solorzano",
                        "id_personal": 9,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ],
                "facilitadora": [
                    {
                        "nombre": "Hector CRACK",
                        "id_personal": 19,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    },
                    {
                        "nombre": "Maria DB",
                        "id_personal": 20,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ],
                "participante": [
                    {
                        "nombre": "Fernando Maggi Llerandi",
                        "id_participante": 3,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    },
                    {
                        "nombre": "Sofia Guadalupe ",
                        "id_participante": 1,
                        "idioma": "Español",
                        "nivel": "Avanzado"
                    }
                ]
            }
        }
    ],
    "usuariosSinGrupo": {
        "participante": [
            {
                "id_participante": 2,
                "nombre": "Maria Solorzano",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_participante": 4,
                "nombre": "Diego Messi",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_participante": 5,
                "nombre": "Aurelia Antonia",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_participante": 6,
                "nombre": "Maraly Trinidad",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_participante": 11,
                "nombre": "Juan Pérez",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_participante": 12,
                "nombre": "Mac Antonio",
                "idioma": "Español",
                "nivel": "Básico"
            }
        ],
        "instructora": [
            {
                "id_personal": 10,
                "nombre": "Maria Candelaria",
                "idioma": "Español",
                "nivel": "Avanzado"
            }
        ],
        "facilitadora": [
            {
                "id_personal": 12,
                "nombre": "Mara Solorzano",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_personal": 11,
                "nombre": "Diego Simba",
                "idioma": "Español",
                "nivel": "Básico"
            }
        ],
        "staff": [
            {
                "id_personal": 22,
                "nombre": "Steren",
                "idioma": "Español",
                "nivel": "Avanzado"
            },
            {
                "id_personal": 21,
                "nombre": "Maria Oracle",
                "idioma": "Español",
                "nivel": "Básico"
            },
            {
                "id_personal": 1,
                "nombre": "Diego Lopez Romero",
                "idioma": "Español",
                "nivel": "Avanzado"
            }
        ],
        "mentora": [
            {
                "id_mentora": 7,
                "nombre": "Carlos"
            },
            {
                "id_mentora": 8,
                "nombre": "Rosa Paredes"
            }
        ]
    }
}
```


---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
{
  "message": "Grupos actualizados con éxito"
}
```

---

### **Errores**

#### **400 - Solicitud Inválida**

Si el array de actualizaciones está vacío o no se proporciona, el servidor responderá con:

```json
{
  "error": "Se requiere un array de grupos"
}
```

Si no se proporciona el campo `id_grupo` en alguno de los objetos, el servidor responderá con un JSON en el siguiente formato:

```json
{
  "error": "Cada actualización debe incluir un id_grupo"
}
```

Si no se proporcionan actualizaciones en el cuerpo de la solicitud, el servidor responderá con:

```json
{
    "error": "No se proporcionaron actualizaciones"
}
```

#### **500 - Error Interno del Servidor**

Si ocurre un problema inesperado, se enviará la siguiente respuesta:

```json
{
  "error": "Error interno del servidor"
}
```

Este error indica que hubo un problema en el servidor. Se recomienda contactar al equipo de desarrollo backend para su resolución.

---

## 4. Generar grupos automáticamente

### **GET /grupos/generar-grupos-automaticos**

Este endpoint permite generar grupos automáticamente para una sede específica.

---

### **Parámetros (query)**

- `id_sede` (entero, requerido): Identificador único de la sede.  
  Se debe enviar como query parameter en la URL, por ejemplo:  
  `/grupos/generar-grupos-automaticos?id_sede=123`

---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
{
    "grupos": [
        {
            "id_grupo": 155,
            "idioma": "Español",
            "nivel": "Avanzado",
            "cupo_max": 20,
            "cupo_actual": 3,
            "inscritos": {
                "participante": [
                    {
                        "id_participante": 2,
                        "nombre": "Maria Solorzano"
                    },
                    {
                        "id_participante": 11,
                        "nombre": "Juan Pérez"
                    },
                    {
                        "id_participante": 1,
                        "nombre": "Sofia Guadalupe "
                    }
                ],
                "instructora": [
                    {
                        "id_personal": 9,
                        "nombre": "Hector Solorzano"
                    }
                ],
                "facilitadora": [
                    {
                        "id_personal": 12,
                        "nombre": "Mara Solorzano"
                    },
                    {
                        "id_personal": 19,
                        "nombre": "Hector CRACK"
                    }
                ],
                "staff": [
                    {
                        "id_personal": 22,
                        "nombre": "Steren"
                    }
                ],
                "mentora": [
                    {
                        "id_mentora": 60,
                        "nombre": "qqq"
                    }
                ]
            }
        }
    ],
    "usuariosSinGrupo": {
        "participante": [
            {
                "id_participante": 4,
                "nombre": "Diego Messi"
            },
            {
                "id_participante": 5,
                "nombre": "Aurelia Antonia"
            }
        ],
        "instructora": [
            {
                "id_personal": 10,
                "nombre": "Maria Candelaria"
            }
        ],
        "facilitadora": [
            {
                "id_personal": 20,
                "nombre": "Maria DB"
            },
            {
                "id_personal": 11,
                "nombre": "Diego Simba"
            }
        ],
        "staff": [
            {
                "id_personal": 21,
                "nombre": "Maria Oracle"
            },
            {
                "id_personal": 1,
                "nombre": "Diego Lopez Romero"
            },
            {
                "id_personal": 17,
                "nombre": "Carlos"
            }
        ],
        "mentora": [
            {
                "id_mentora": 21,
                "nombre": "Alejandro Méndez"
            },
            {
                "id_mentora": 22,
                "nombre": "mamasita"
            }
        ]
    }
}
```

---

### **Errores**

#### **400 - Solicitud Inválida**

Si no se proporciona el parámetro `id_sede`, el servidor responderá con un JSON en el siguiente formato:

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

## 5. Eliminar Grupos

### **DELETE /grupos/eliminar-grupos-sede**

Este endpoint permite eliminar múltiples grupos de manera simultánea.

---

### **Parámetros (body)**

La solicitud debe enviarse en formato JSON con un array de identificadores numéricos de los grupos a eliminar:

```json
[130, 131, 132]
```

---

### **Respuesta Exitosa (200 OK)**

Si la solicitud es exitosa, el servidor responderá con un JSON en el siguiente formato:

```json
{
  "message": "Grupos eliminados con éxito"
}
```

---

### **Errores**

#### **400 - Solicitud Inválida**

Si no se proporciona un array de grupos o el array está vacío, el servidor responderá con:

```json
{
  "error": "Se requiere un array de grupos"
}
```

Si alguno de los elementos del array no es un número, el servidor responderá con:

```json
{
  "error": "Cada grupo debe ser un id numérico"
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