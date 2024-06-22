/** 방명록 Store */
export const Guestbook = {
  namespaced: true,
  state: () => ({
    /** 방명록 목록 */
    guestbookList: [],
    /** 수정된 방명록 */
    updatedGuestbook: {},
    /** 수정된 방명록 댓글 */
    updatedGuestbookReply: {},
    /** 삭제된 방명록 */
    removedGuestbook: {},
    /** 삭제된 방명록 댓글 */
    removedGuestbookReply: {},
    /** 방명록 코드 목록 */
    code: [],
  }),
  mutations: {
    SET_GUESTBOOK_LIST(state, guestbookList) {
      state.guestbookList = [...state.guestbookList, ...guestbookList];
    },
    PUSH_GUESTBOOK_LIST(state, guestbook) {
      state.guestbookList = [...state.guestbookList, guestbook];
    },
    SPLICE_GUESTBOOK_LIST(state, index) {
      state.guestbookList.splice(index, 1);
    },
    SET_UPDATED_GUESTBOOK(state, updatedGuestbook) {
      state.updatedGuestbook = updatedGuestbook;
    },
    SET_UPDATED_GUESTBOOK_REPLY(state, updatedGuestbookReply) {
      state.updatedGuestbookReply = updatedGuestbookReply;
    },
    SET_REMOVED_GUESTBOOK(state, removedGuestbook) {
      state.removedGuestbook = removedGuestbook;
    },
    SET_REMOVED_GUESTBOOK_REPLY(state, removedGuestbookReply) {
      state.removedGuestbookReply = removedGuestbookReply;
    },
    SET_CODE(state, code) {
      state.code = code;
    },
  },
  actions: {
    FETCH_GUESTBOOK_LIST({ commit }, values) {
      commit('SET_GUESTBOOK_LIST', values);
    },
    FETCH_UPDATED_GUESTBOOK({ commit }, values) {
      commit('SET_UPDATED_GUESTBOOK', values);
    },
    FETCH_UPDATED_GUESTBOOK_REPLY({ commit }, values) {
      commit('SET_UPDATED_GUESTBOOK_REPLY', values);
    },
    FETCH_REMOVED_GUESTBOOK({ commit }, values) {
      commit('SET_REMOVED_GUESTBOOK', values);
    },
    FETCH_REMOVED_GUESTBOOK_REPLY({ commit }, values) {
      commit('SET_REMOVED_GUESTBOOK_REPLY', values);
    },
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
  },
};
