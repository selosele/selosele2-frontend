/** 로딩 Store */
export const Loading = {
  namespaced: true,
  state: () => ({
    /** 로딩 사용 여부 */
    useLoading: true,
    /** 로딩 완료 여부 */
    isLoading: false,
  }),
  mutations: {
    SET_USE_LOADING(state, useLoading) {
      state.useLoading = useLoading;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    FETCH_USE_LOADING({ commit }, values) {
      commit('SET_USE_LOADING', values);
    },
    FETCH_IS_LOADING({ commit }, values) {
      commit('SET_IS_LOADING', values);
    },
  },
};
