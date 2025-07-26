import Client from './client';

class API {
  constructor(apiKey, options = {}) {
    this.client = new Client(apiKey, options);
  }

  async detect(text) {
    if (Array.isArray(text)) {
      process.emitWarning(
        'detect() called with an array is deprecated. Use detectBatch() instead.',
        'DeprecationWarning',
        'DETECT_ARRAY_DEPRECATION',
      );
      return this.detectBatch(text);
    }

    return this.client.post('detect', { q: text });
  }

  async detectBatch(texts) {
    return this.client.post('detect-batch', { q: texts });
  }

  async detectCode(text) {
    const results = await this.detect(text);

    return results[0]?.language || null;
  }

  async languages() {
    return this.client.get('languages');
  }

  async accountStatus() {
    return this.client.get('account/status');
  }

  // @deprecated
  async userStatus() {
    process.emitWarning(
      'userStatus() is deprecated. Use accountStatus() instead.',
      'DeprecationWarning',
      'USER_STATUS_DEPRECATION',
    );

    return this.accountStatus();
  }
}

module.exports = API;
