/** Breadcrumb Store */
export const Breadcrumb = {
  namespaced: true,
  state: () => ({
    /** 현재 페이지 타이틀 */
    pageTitle: '',
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit }, pageTitle) {
      document.title = pageTitle;
      commit('SET_PAGE_TITLE', pageTitle);
    },
  },
};
