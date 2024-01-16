/** 프로그램 Store */
export const Program = {
  namespaced: true,
  state: () => ({
    /** 수정된 프로그램 */
    updatedProgram: {},
    /** 삭제된 프로그램 */
    removedProgram: {},
  }),
  mutations: {
    SET_UPDATED_PROGRAM(state, updatedProgram) {
      state.updatedProgram = updatedProgram;
    },
    SET_REMOVED_PROGRAM(state, removedProgram) {
      state.removedProgram = removedProgram;
    },
  },
  actions: {
    FETCH_UPDATED_PROGRAM({ commit }, values) {
      commit('SET_UPDATED_PROGRAM', values);
    },
    FETCH_REMOVED_PROGRAM({ commit }, values) {
      commit('SET_REMOVED_PROGRAM', values);
    },
  },
};
