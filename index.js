const https = require('https');
const { URL } = require('url');

class JsonPlaceholderClient {
    constructor({ apiKey } = {}) {
          this.apiKey = apiKey || null;
          this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

  _get(path, params = {}) {
        return this._request('GET', path, params);
  }

  _post(path, body = {}) {
        return this._request('POST', path, {}, body);
  }

  _request(method, path, params = {}, body = null) {
        return new Promise((resolve, reject) => {
                const url = new URL(this.baseUrl + path);
                for (const [k, v] of Object.entries(params)) {
                          if (v !== undefined && v !== null) url.searchParams.set(k, v);
                }

                                 const payload = body ? JSON.stringify(body) : null;
                const req = https.request(
                          url,
                  {
                              method,
                              headers: {
                                            'Content-Type': 'application/json',
                                            ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
                              },
                  },
                          (res) => {
                                      let data = '';
                                      res.on('data', (chunk) => { data += chunk; });
                                      res.on('end', () => {
                                                    try {
                                                                    resolve(JSON.parse(data));
                                                    } catch {
                                                                    resolve(data);
                                                    }
                                      });
                          },
                        );
                req.on('error', reject);
                if (payload) req.write(payload);
                req.end();
        });
  }

  async getPosts() {
        return this._get('/posts');
  }

  async getPost(id) {
        return this._get(`/posts/${id}`);
  }

  async getUsers() {
        return this._get('/users');
  }

  async createPost(data) {
        return this._post('/posts', data);
  }
}

module.exports = JsonPlaceholderClient;
