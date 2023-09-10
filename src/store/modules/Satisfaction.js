/** 만족도조사 Store */
export const Satisfaction = {
  namespaced: true,
  state: () => ({
    /** 만족도조사 코드 목록 */
    code: [],
  }),
  mutations: {
    SET_CODE(state, code) {
      state.code = code;
    },
  },
  actions: {
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
  },
};
