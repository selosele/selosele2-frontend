/** 블로그 환경설정 Store */
export const BlogConfig = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  mutations: {
    SET_BLOG_CONFIG(state, data) {
      state.data = data;
    },
  },
  actions: {
    FETCH_BLOG_CONFIG({ commit }, values) {
      commit('SET_BLOG_CONFIG', values);
    },
  },
};
