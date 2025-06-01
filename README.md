# mcp-todoItems

MCP TodoItems es un servidor Model Context Protocol (MCP) que facilita la integración con la TodosAPI, la cual fue extendida en la primera parte del desafío. Esta implementación se basa en el proyecto propocionado por Crunchloop: https://github.com/crunchloop/mcp-teamtailor

## Dependencias

No se necesitan otras dependecias para usar el servidor MCP TodoItems.

## Guía de Uso

Se presenta una guía para ejecutar el servidor MCP y configurarlo en el cliente **Claude Desktop** (fue la herramienta utilizada durante el desarrollo). 

### 1. Instalar dependencias y compilar el proyecto

Abrir una terminal en la raíz del proyecto y ejecutar los siguientes comandos:

```bash
# Instalar las dependencias
npm install

# Compilar el proyecto
npm run build
```
### 2. Configurar Claude Desktop

Una vez que el servidor esté listo, se debe configurar **Claude Desktop** para que pueda comunicarse con él.

A continuación se muestra un ejemplo de configuración genérico:

```json
{
  "mcpServers": {
    "todolist": {
      "command": "node",
      "args": [
        "ejemplo/ruta/archivo/dist/index.js" //Ruta local al archivo index.js
      ],
      "env": {
        "TODOLIST_API_URL": "https://ejemplo.api" //URL de la API
      }
    }
  }
}
```

## MCP Transport

Por el momento, solo se ha implementado el transporte `stdio`.

## Tools

A continuación se tiene la lista de tools disponibles:

- **todo_create_item** – Crea un ítem en la lista especificada.
  - `listId`: ID de la lista en la que se creará el ítem (string, required)
  - `description`: Descripción del ítem a crear (string, required)

- **todo_update_item** – Actualiza la descripción de un ítem existente.
  - `listId`: ID de la lista que contiene el ítem (string, required)
  - `itemId`: ID del ítem a actualizar (string, required)
  - `description`: Nueva descripción del ítem (string, required)

- **todo_complete_item** – Marca un ítem como completado.
  - `listId`: ID de la lista que contiene el ítem (string, required)
  - `itemId`: ID del ítem a marcar como completado (string, required)

- **todo_delete_item** – Elimina un ítem de la lista.
  - `listId`: ID de la lista que contiene el ítem (string, required)
  - `itemId`: ID del ítem a eliminar (string, required)

## Experiencia de implementación

En primer lugar, crear un servidor MCP que exponga distintas tools fue un desafío totalmente **nuevo** para mí, por lo que contar con el proyecto base que me proporcionaron resultó de mucha ayuda para orientarme y saber por dónde empezar. A su vez, **Claude Desktop** era otra herramienta que no conocía, gracias a recursos en internet (ej: tutorial en YouTube, inteligencia artificial, documentación de Claude) y la configuración de ejemplo, pude integrar correctamente las tools en la IA. 

Sinceramente, este proyecto me permitió descubrir una herramienta muy útil, ya que resulta muy conveniente poder enviar prompts en lenguaje natural y que una IA los traduzca en solicitudes a una API.