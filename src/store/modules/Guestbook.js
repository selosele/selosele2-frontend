/** 방명록 Store */
export const Guestbook = {
  namespaced: true,
  state: () => ({
    /** 수정된 방명록 */
    updatedGuestbook: {},
    /** 삭제된 방명록 */
    removedGuestbook: {},
  }),
  mutations: {
    SET_UPDATED_GUESTBOOK(state, updatedGuestbook) {
      state.updatedGuestbook = updatedGuestbook;
    },
    SET_REMOVED_GUESTBOOK(state, removedGuestbook) {
      state.removedGuestbook = removedGuestbook;
    },
  },
  actions: {
    FETCH_UPDATED_GUESTBOOK({ commit }, values) {
      commit('SET_UPDATED_GUESTBOOK', values);
    },
    FETCH_REMOVED_GUESTBOOK({ commit }, values) {
      commit('SET_REMOVED_GUESTBOOK', values);
    },
  },
};
