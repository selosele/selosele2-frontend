import { createStore } from 'vuex';
import ConfigService from './services/config/ConfigService';

export default createStore({
  state: {
    // 블로그 환경설정
    config: [],
  },
  mutations: {
    SET_CONFIG(state, config) {
      state.config = config;
    },
  },
  actions: {
    async FETCH_CONFIG(ctx) {
      const configService = new ConfigService();
      const config = await configService.getConfig();

      ctx.commit('SET_CONFIG', config[0]);
      document.title = config[0].title;
    },
  },
});
