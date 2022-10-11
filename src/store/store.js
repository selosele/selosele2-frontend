import { createStore } from 'vuex';
import snackbar from '@/utils/ui/Snackbar';
import axios from 'axios';

export default createStore({
  state: {
    // Token
    token: null,
    // 공통코드 - 포스트/콘텐츠 만족도조사
    satisCode: [],
    // 블로그 환경설정
    blogConfig: [],
  },
  getters: {
    // 로그인 여부
    isLogin(state) {
      return state.token !== null;
    },
    // 개발/운영모드 구분
    isDevelopment() {
      return process.env.NODE_ENV === 'development';
    },
    isProduction() {
      return process.env.NODE_ENV === 'production';
    },
  },
  mutations: {
    SET_TOKEN(state, _token) {
      state.token = _token;
      localStorage.setItem('token', _token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${_token}`;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = null;
    },
    SET_SATIS_CODE(state, satisCode) {
      state.satisCode = satisCode;
    },
    SET_BLOG_CONFIG(state, blogConfig) {
      state.blogConfig = blogConfig;
    },
  },
  actions: {
    LOGIN({ commit }, values) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_API_URL}/auth/signin`, values)
          .then(res => {
            const token = res.data.accessToken;
            if (token) {
              commit('SET_TOKEN', token);
              resolve('ok');
            }
          }).catch(error => {
            resolve('no');
          });
      });
    },
    LOGOUT({ commit }) {
      commit('CLEAR_TOKEN');
    },
    FETCH_CODE(ctx) {
      // 포스트/콘텐츠 만족도조사
      axios.get(`${process.env.VUE_APP_API_URL}/code/list/B01`)
        .then(res => {
          ctx.commit('SET_SATIS_CODE', res.data);
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    FETCH_BLOG_CONFIG(ctx) {
      axios.get(`${process.env.VUE_APP_API_URL}/blogconfig`)
        .then(res => {
          ctx.commit('SET_BLOG_CONFIG', res.data);
          document.title = res.data.title;
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
  },
});
