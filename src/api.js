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

  searchRepositories(q, order, per_page) {
    const path = `/search/repositories`;

    return this.request.get({
      url: `${this.host}${path}`,
      qs: {
        q,
        order,
        per_page,
      },
    });
  }

  getUserInfo(owner) {
    const path = `/users/${owner}`;

    return this.request.get({
      url: `${this.host}${path}`,
    });
  }

  createNewRepo(name) {
    const path = `/user/repos`;

    return this.request.post({
      url: `${this.host}${path}`,
      body: {
        name,
      },
    });
  }

  updateRepo(owner, oldReposName, newReposName) {
    const path = `/repos/${owner}/${oldReposName}`;

    return this.request.patch({
      url: `${this.host}${path}`,
      body: {
        name: newReposName,
      },
    });
  }
}

module.exports = Api;