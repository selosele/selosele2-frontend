import { createStore } from 'vuex';
import snackbar from '@/utils/ui/Snackbar';
import axios from 'axios';

export default createStore({
  state: {
    // JWT
    token: null,
    // 공통코드
    code: [],
    // 블로그 환경설정
    blogConfig: [],
    // 사이드바
    sidebar: {},
    // 메인 포스트 목록
    mainPostObj: [],
  },
  getters: {
    // 로그인 여부
    isLogin(state) {
      return state.token !== null;
    },
    // 개발/운영모드 구분
    isDevelopment() {
      return 'development' === process.env.NODE_ENV;
    },
    isProduction() {
      return 'production' === process.env.NODE_ENV;
    },
    // 블로그 환경설정
    blogConfig(state) {
      return state.blogConfig;
    },
    // 사이드바
    sidebar(state) {
      return state.sidebar;
    },
    // 메인 포스트 목록
    mainPostObj(state) {
      return state.mainPostObj;
    },
  },
  mutations: {
    SET_TOKEN(state, _token) {
      state.token = _token;
      localStorage.setItem('token', _token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    SET_CODE(state, code) {
      state.code = code;
    },
    SET_BLOG_CONFIG(state, blogConfig) {
      state.blogConfig = blogConfig;
    },
    SET_SIDEBAR(state, sidebar) {
      state.sidebar = sidebar;
    },
    SET_MAIN_POSTLIST(state, mainPostObj) {
      state.mainPostObj = mainPostObj;
    },
  },
  actions: {
    LOGIN({ commit }, values) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_API_ENDPOINT}/auth/signin`, values)
          .then(res => {
            const token = res.data.accessToken;
            if (token) {
              commit('SET_TOKEN', token);
              resolve(token);
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
      axios.get(`${process.env.VUE_APP_API_ENDPOINT}/code/list`)
        .then(res => {
          ctx.commit('SET_CODE', res.data);
        }).catch(error => {
          snackbar.error(process.env.VUE_APP_ERR_MSG);
        });
    },
    FETCH_BLOG_CONFIG(ctx) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_ENDPOINT}/blogconfig`)
          .then(res => {
            ctx.commit('SET_BLOG_CONFIG', res.data);
            document.title = res.data.title;
            resolve('ok');
          }).catch(error => {
            reject('no');
          });
      })
    },
    FETCH_SIDEBAR({ commit }, values) {
      commit('SET_SIDEBAR', values);
    },
    FETCH_MAIN_POSTLIST({ commit }, values) {
      commit('SET_MAIN_POSTLIST', values);
    },
  },
});
