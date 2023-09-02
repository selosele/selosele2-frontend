/** 만족도조사 Store */
export const Satisfaction = {
  namespaced: true,
  state: () => ({
    /** 만족도조사 코드 데이타 */
    code: [],
    /** 만족도조사 기본 점수 값 */
    defaultScore: '',
  }),
  mutations: {
    SET_SATISFACTION(state, code) {
      state.code = code;
    },
  },
  actions: {
    FETCH_CODE({ commit }, values) {
      commit('SET_SATISFACTION', values);
    },
  },
};
