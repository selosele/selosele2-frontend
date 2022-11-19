import { createStore } from 'vuex';

export default createStore({
  state: {
    // JWT
    token: null,
    // 공통코드
    code: [],
    // 페이지 타이틀
    pageTitle: '',
    // 블로그 환경설정
    blogConfig: [],
    // 사이드바
    sidebar: {},
    // 메인 포스트 목록
    mainPostObj: {},
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
    // 페이지 타이틀
    pageTitle(state) {
      return state.pageTitle;
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
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
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
        commit('SET_TOKEN', values);
        commit('SET_MAIN_POSTLIST', {});
        commit('SET_SIDEBAR', {});
        resolve('ok');
      });
    },
    LOGOUT({ commit }, http) {
      return new Promise((resolve, reject) => {
        http.defaults.headers.common['Authorization'] = '';
        commit('CLEAR_TOKEN');
        commit('SET_MAIN_POSTLIST', {});
        commit('SET_SIDEBAR', {});
        resolve('ok');
      });
    },
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
    FETCH_PAGE_TITLE({ commit }, values) {
      commit('SET_PAGE_TITLE', values);
    },
    FETCH_BLOG_CONFIG({ commit }, values) {
      commit('SET_BLOG_CONFIG', values);
    },
    FETCH_SIDEBAR({ commit }, values) {
      commit('SET_SIDEBAR', values);
    },
    FETCH_MAIN_POSTLIST({ commit }, values) {
      commit('SET_MAIN_POSTLIST', values);
    },
  },
});
