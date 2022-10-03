import axios from 'axios';

/**
 * HTTP 통신 유틸
 */
class HttpClient {
  http = null;

  constructor() {
    this.http = axios.create({
      baseURL: '/api/v1',
    });
  }

  async get(url, params = {}) {
    const res = await this.http.get(url, { params: params });
    return res.data;
  }

  async post(url, body) {
    const res = await this.http.post(url, body)
    return res;
  }

  async put() {}

  async delete() {}
}

const http = new HttpClient();

export default http;
