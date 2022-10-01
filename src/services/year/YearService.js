import http from "@/utils/http/HttpClient";

export default class YearService {
  constructor() {}

  /**
   * 포스트의 연도 및 개수 조회
   * @returns 포스트의 연도 및 개수
   */
  async listYearAndCount() {
    return await http.get('/year/list');
  }

  /**
   * 연도별 포스트 목록 조회 조회
   * @returns 연도별 포스트 목록
   */
  async listPostsByYear(year) {
    return await http.get(`/year/list/${year}`);
  }
  
}
