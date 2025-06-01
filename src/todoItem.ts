import https from 'https';
import http from 'http';
import { URL } from 'url';

export interface TodoItem {
  id: string;
  description: string;
  isCompleted: boolean;
  listId: string;
}

export class TodoClient {
  private readonly baseUrl: string;

  /**
   * @param baseUrl 
   */

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createItem(listId: string, description: string): Promise<TodoItem> {
    const url = new URL(`${this.baseUrl}/${listId}/items`);
    const payload = { description };
    const body = await this.request<TodoItem>(url, 'POST', payload);
    return body;
  }

  async updateItem(listId: string, itemId: string, description: string): Promise<TodoItem> {
    const url = new URL(`${this.baseUrl}/${listId}/items/${itemId}`);
    const payload = { description };
    const body = await this.request<TodoItem>(url, 'PUT', payload);
    return body;
  }

  async completeItem(listId: string, itemId: string): Promise<TodoItem> {
    const url = new URL(`${this.baseUrl}/${listId}/items/${itemId}/complete`);
    const body = await this.request<TodoItem>(url, 'PUT');
    return body;
  }

  async deleteItem(listId: string, itemId: string): Promise<{ success: boolean }> {
    const url = new URL(`${this.baseUrl}/${listId}/items/${itemId}`);
    await this.request<void>(url, 'DELETE');
    return { success: true };
  }

  private request<T>(url: URL, method: string, payload?: object): Promise<T> {
    return new Promise((resolve, reject) => {
      const stringBody = payload ? JSON.stringify(payload) : undefined;
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      if (stringBody) {
        headers['Content-Length'] = Buffer.byteLength(stringBody).toString();
      }

      const lib = url.protocol === 'https:' ? https : http;

      const options: (https.RequestOptions | http.RequestOptions) = {
        method,
        headers,
      };

      const req = lib.request(url, options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          const status = res.statusCode ?? 0;
          if (status === 204 || rawData.length === 0) {
            // @ts-ignore
            return resolve(undefined);
          }
          if (status >= 200 && status < 300) {
            try {
              const parsed = JSON.parse(rawData) as T;
              return resolve(parsed);
            } catch (err) {
              return reject(new Error(`JSON inválido en respuesta: ${err}`));
            }
          } else {
            return reject(new Error(`HTTP ${status}: ${rawData}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      if (stringBody) {
        req.write(stringBody);
      }
      req.end();
    });
  }
}