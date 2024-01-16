/** 프로그램 Store */
export const Program = {
  namespaced: true,
  state: () => ({
    /** 등록/수정된 프로그램 */
    savedProgram: {},
    /** 삭제된 프로그램 */
    removedProgram: {},
  }),
  mutations: {
    SET_SAVED_PROGRAM(state, savedProgram) {
      state.savedProgram = savedProgram;
    },
    SET_REMOVED_PROGRAM(state, removedProgram) {
      state.removedProgram = removedProgram;
    },
  },
  actions: {
    FETCH_SAVED_PROGRAM({ commit }, values) {
      commit('SET_SAVED_PROGRAM', values);
    },
    FETCH_REMOVED_PROGRAM({ commit }, values) {
      commit('SET_REMOVED_PROGRAM', values);
    },
  },
};
