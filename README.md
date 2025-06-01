# mcp-todoItems

MCP TodoItems es un servidor Model Context Protocol (MCP) que brinda una integración con la TodosAPI, la cual fue extendida en la primera parte del desafío.

## Dependencias

No se necesitan otras dependecias para usar el servidor MCP TodoItems.

## Uso

A continuación se muestra un ejemplo de configuración general para el cliente **Claude Desktop**, que fue la herramienta utilizada:

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
