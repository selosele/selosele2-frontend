/** 로딩 Store */
export const Loading = {
  namespaced: true,
  state: () => ({
    /** 로딩 사용 여부 */
    useLoading: true,
    /** 로딩 완료 여부 */
    isLoading: false,
    /** 로딩을 애플리케이션 로드 시 최초 한 번만 실행할지 여부 */
    isInitialLoading: true,
  }),
  mutations: {
    SET_USE_LOADING(state, useLoading) {
      state.useLoading = useLoading;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_IS_INITIAL_LOADING(state, isInitialLoading) {
      state.isInitialLoading = isInitialLoading;
    },
  },
  actions: {
    FETCH_USE_LOADING({ commit }, values) {
      commit('SET_USE_LOADING', values);
    },
    FETCH_IS_LOADING({ commit }, values) {
      commit('SET_IS_LOADING', values);
    },
    FETCH_IS_INITIAL_LOADING({ commit }, values) {
      commit('SET_IS_INITIAL_LOADING', values);
    },
  },
};
