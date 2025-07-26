const { version } = require('../package.json');

module.exports = {
  timeout: 60,
  protocol: 'https',
  host: 'ws.detectlanguage.com',
  apiVersion: 'v3',
  userAgent: `detectlanguage-node/${version}`,
};
