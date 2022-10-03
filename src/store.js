import { createStore } from 'vuex';
import snackbar from '@/utils/ui/Snackbar';
import axios from 'axios';

export default createStore({
  state: {
    // 개발모드/운영모드 체크
    isProduction: false,
    // 공통코드 - 포스트/콘텐츠 만족도조사
    satisCode: [],
    // 블로그 환경설정
    config: [],
  },
  mutations: {
    SET_NODE_ENV(state, isProduction) {
      state.isProduction = isProduction;
    },
    SET_SATIS_CODE(state, satisCode) {
      state.satisCode = satisCode;
    },
    SET_CONFIG(state, config) {
      state.config = config;
    },
  },
  actions: {
    async FETCH_NODE_ENV(ctx) {
      ctx.commit('SET_NODE_ENV', (process.env.NODE_ENV === 'production'));
    },
    async FETCH_CODE(ctx) {
      // 포스트/콘텐츠 만족도조사
      axios.get('/api/v1/code/list/B01')
        .then(res => {
          ctx.commit('SET_SATIS_CODE', res.data);
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    async FETCH_CONFIG(ctx) {
      axios.get('/api/v1/config')
        .then(res => {
          ctx.commit('SET_CONFIG', res.data);
          document.title = res.data.title;
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
  },
});
