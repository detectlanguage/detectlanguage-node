import * as defaults from './defaults';
import { handleError } from './error';

export default class Client {
  constructor(apiKey, options) {
    const config = { ...defaults, ...options };

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': config.userAgent,
      Authorization: `Bearer ${apiKey}`,
    };

    this.baseURL = `${config.protocol}://${config.host}/${config.apiVersion}/`;
    this.timeout = config.timeout * 1000;
    this.headers = headers;
  }

  /**
   * Make a GET request
   * @param {string} path - API endpoint path
   * @returns {Promise<Object>} Response data
   */
  async get(path) {
    return this.request(path, {
      method: 'GET',
    });
  }

  /**
   * Make a POST request
   * @param {string} path - API endpoint path
   * @param {Object} data - Request body data
   * @returns {Promise<Object>} Response data
   */
  async post(path, data) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async request(path, options = {}) {
    try {
      const fetchOptions = {
        headers: this.headers,
        timeout: this.timeout,
        ...options,
      };

      const response = await fetch(this.baseURL + path, fetchOptions);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (e) {
      return handleError(e);
    }
  }
}
