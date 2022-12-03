/**
 * 공통코드 Store
 */
export const Code = {
  namespaced: true,
  state: () => ({
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
