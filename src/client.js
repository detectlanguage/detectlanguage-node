import * as defaults from './defaults';
import { handleError } from './error';

export default class Client {
  constructor(apiKey, options) {
    const config = { ...defaults, ...options };

    const headers = {
      'User-Agent': config.userAgent,
      Authorization: `Bearer ${apiKey}`,
    };

    this.baseURL = `${config.protocol}://${config.host}/${config.apiVersion}/`;
    this.timeout = config.timeout * 1000;
    this.headers = headers;
  }

  async get(path) {
    try {
      const response = await fetch(this.baseURL + path, {
        headers: this.headers,
        timeout: this.timeout,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (e) {
      return handleError(e);
    }
  }

  async post(path, data) {
    try {
      const response = await fetch(this.baseURL + path, {
        method: 'POST',
        headers: Object.assign(this.headers, { 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
        timeout: this.timeout,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (e) {
      return handleError(e);
    }
  }
}
