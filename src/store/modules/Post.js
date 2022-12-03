/**
 * 포스트 Store
 */
export const Post = {
  namespaced: true,
  state: () => ({
    // 메인 포스트 목록
    mainPostObj: {},
  }),
  mutations: {
    SET_MAIN_POSTLIST(state, mainPostObj) {
      state.mainPostObj = mainPostObj;
    },
  },
  actions: {
    FETCH_MAIN_POSTLIST({ commit }, values) {
      commit('SET_MAIN_POSTLIST', values);
    },
  },
};
