import axios from 'axios';

class HttpClient {
  http = null;

  constructor() {
    this.http = axios.create({
      baseURL: '',
    });
  }

  async get(url, params = {}) {
    const response = await this.http.get(url, { params: params });
    return response.data;
  }

  async post() {}

  async put() {}

  async delete() {}
}

const http = new HttpClient();

export default http;