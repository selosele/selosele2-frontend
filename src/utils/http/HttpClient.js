import axios from 'axios';

/**
 * HTTP 통신 유틸
 */
class HttpClient {
  http = null;

  constructor() {
    this.http = axios.create({
      baseURL: '',
    });
  }

  async get(url, params = {}) {
    const res = await this.http.get(url, { params: params });
    return res.data;
  }

  async post() {}

  async put() {}

  async delete() {}
}

let http = null;
if (http === null) http = new HttpClient();

export default http;
