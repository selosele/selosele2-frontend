/** Breadcrumb Store */
export const Breadcrumb = {
  namespaced: true,
  state: () => ({
    /** 현재 페이지 타이틀 */
    pageTitle: '',
    /** 초기 페이지 타이틀 */
    initialPageTitle: '',
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
    SET_INITIAL_PAGE_TITLE(state, initialPageTitle) {
      state.initialPageTitle = initialPageTitle;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit }, pageTitle) {
      window.document.title = pageTitle;
      commit('SET_PAGE_TITLE', pageTitle);
    },
    FETCH_INITIAL_PAGE_TITLE({ commit }, initialPageTitle = '로딩 중...') {
      commit('SET_INITIAL_PAGE_TITLE', initialPageTitle);
    },
  },
};
