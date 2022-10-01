import http from "@/utils/http/HttpClient";

export default class CodeService {
  constructor() {}

  /**
   * 공통코드 조회
   * @returns 공통코드
   */
   async listCode(prefix) {
    return await http.get(`/code/list/${prefix}`);
  }

}
