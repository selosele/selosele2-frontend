/** 레이아웃 Store */
export const Layout = {
  namespaced: true,
  state: () => ({
    /** 페이지 타이틀 */
    pageTitle: '',
    /** 사이드바 */
    sidebar: {},
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
    SET_SIDEBAR(state, sidebar) {
      state.sidebar = sidebar;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit }, values) {
      commit('SET_PAGE_TITLE', values);
    },
    FETCH_SIDEBAR({ commit }, values) {
      commit('SET_SIDEBAR', values);
    },
  },
};
