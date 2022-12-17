/** Splitter Store */
 export const Splitter = {
  namespaced: true,
  state: () => ({
    isActive: false,
  }),
  mutations: {
    TOGGLE(state, isActive) {
      state.isActive = isActive;
    }
  },
};
