import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { TodoClient } from "./todoItem.js";

if (!process.env.TODOLIST_API_URL) {
  throw new Error("Missing TODOLIST_API_URL environment variable");
}

const client = new TodoClient(process.env.TODOLIST_API_URL);

const server = new McpServer({
  name: "todolist",
  version: "1.0.0"
});

server.tool(
  "todo_create_item",
  "Crea un ítem en la lista especificada",
  {
    listId: z.string(),
    description: z.string()
  },
  async ({ listId, description }) => {
    const item = await client.createItem(listId, description);
    return {
      content: [{ type: 'text', text: JSON.stringify(item) }]
    };
  }
);

server.tool(
  "todo_update_item",
  "Actualiza la descripción de un ítem existente",
  {
    listId: z.string(),
    itemId: z.string(),
    description: z.string()
  },
  async ({ listId, itemId, description }) => {
    const item = await client.updateItem(listId, itemId, description);
    return {
      content: [{ type: 'text', text: JSON.stringify(item) }]
    };
  }
);

server.tool(
  "todo_complete_item",
  "Marca un ítem como completado",
  {
    listId: z.string(),
    itemId: z.string()
  },
  async ({ listId, itemId }) => {
    const item = await client.completeItem(listId, itemId);
    return {
      content: [{ type: 'text', text: JSON.stringify(item) }]
    };
  }
);

server.tool(
  "todo_delete_item",
  "Elimina un ítem de la lista",
  {
    listId: z.string(),
    itemId: z.string()
  },
  async ({ listId, itemId }) => {
    const result = await client.deleteItem(listId, itemId);
    return {
      content: [{ type: 'text', text: JSON.stringify(result) }]
    };
  }
);

export { server };