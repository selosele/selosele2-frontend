/** 공통코드 Store */
export const Code = {
  namespaced: true,
  state: () => ({
    /** 공통코드 목록 */
    data: [],
  }),
  mutations: {
    SET_CODE(state, data) {
      state.data = data;
    },
  },
  actions: {
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
  },
};
