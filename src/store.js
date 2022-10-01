import { createStore } from 'vuex';
import ConfigService from '@/services/config/ConfigService';
import CodeService from './services/code/CodeService';

export default createStore({
  state: {
    // 공통코드 - 포스트/콘텐츠 만족도조사
    satisCode: [],
    // 블로그 환경설정
    config: [],
  },
  mutations: {
    SET_SATIS_CODE(state, satisCode) {
      state.satisCode = satisCode;
    },
    SET_CONFIG(state, config) {
      state.config = config;
    },
  },
  actions: {
    async FETCH_CODE(ctx) {
      const codeService = new CodeService();
      // 포스트/콘텐츠 만족도조사
      const satisCode = await codeService.listCode('B01');

      ctx.commit('SET_SATIS_CODE', satisCode);
    },
    async FETCH_CONFIG(ctx) {
      const configService = new ConfigService();
      const config = await configService.getConfig();

      ctx.commit('SET_CONFIG', config);
      document.title = config.title;
    },
  },
});
