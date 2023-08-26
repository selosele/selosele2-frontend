/** Splitter Store */
 export const Splitter = {
  namespaced: true,
  state: () => ({
    /** Splitter 활성화 여부 */
    isActive: false,
  }),
  mutations: {
    TOGGLE(state, isActive) {
      state.isActive = isActive;
    }
  },
};
