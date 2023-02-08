const request = require('request-promise');
const HOST = 'https://api.github.com';
require('dotenv').config();

class Api {
  constructor(host = HOST) {
    this.host = host;
    this.request = request.defaults({
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime/7.28.4',
      },
      auth: {
        user: process.env.USERNAME,
        pass: process.env.SECRET_KEY,
      },
      json: true,
      rejectUnauthorized: false,
      // resolveWithFullResponse: true
    });
  }
}

module.exports = Api;
