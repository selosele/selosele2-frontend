/** 로딩 Store */
export const Loading = {
  namespaced: true,
  state: () => ({
    /** 로딩 여부 */
    isLoading: false,
  }),
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    FETCH_LOADING({ commit }, values) {
      commit('SET_LOADING', values);
    },
  },
};
