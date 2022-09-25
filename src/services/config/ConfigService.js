import http from '@/utils/http/HttpClient';

export default class ConfigService {
  constructor() {}

  /**
   * 블로그 환경설정 정보 조회
   * @returns 블로그 환경설정 정보
   */
  async getConfig() {
    return await http.get('/config');
  }
}
