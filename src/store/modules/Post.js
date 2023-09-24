/** 포스트 Store */
export const Post = {
  namespaced: true,
  state: () => ({
    /** 메인 포스트 목록 */
    mainPostList: {},
    /** 체크된 포스트 ID 목록 */
    checkList: [],
    /** 전체선택 체크박스 체크 여부 */
    checkAll: false,
    /** 선택된 카테고리 ID */
    selectedCategoryId: '',
    /** 수정된 포스트 댓글 */
    updatedPostReply: {},
    /** 삭제된 포스트 댓글 */
    removedPostReply: {},
    /** 포스트 코드 목록 */
    code: [],
    /** 선택 검색옵션 목록 */
    optionSelectList: [],
  }),
  mutations: {
    SET_MAIN_POSTLIST(state, mainPostList) {
      state.mainPostList = mainPostList;
    },
    SET_CHECKLIST(state, checkList) {
      state.checkList = checkList;
    },
    SET_CHECKALL(state, checkAll) {
      state.checkAll = checkAll;
    },
    SET_SELECTED_CATEGORY_ID(state, selectedCategoryId) {
      state.selectedCategoryId = selectedCategoryId;
    },
    SET_UPDATED_POST_REPLY(state, updatedPostReply) {
      state.updatedPostReply = updatedPostReply;
    },
    SET_REMOVED_POST_REPLY(state, removedPostReply) {
      state.removedPostReply = removedPostReply;
    },
    SET_CODE(state, code) {
      state.code = code;
    },
    SET_OPTION_SELECT_LIST(state, optionSelectList) {
      state.optionSelectList = optionSelectList;
    },
  },
  actions: {
    FETCH_MAIN_POSTLIST({ commit }, values) {
      commit('SET_MAIN_POSTLIST', values);
    },
    FETCH_CHECKLIST({ commit }, values) {
      commit('SET_CHECKLIST', values);
    },
    FETCH_CHECKALL({ commit }, values) {
      commit('SET_CHECKALL', values);
    },
    FETCH_SELECTED_CATEGORY_ID({ commit }, values) {
      commit('SET_SELECTED_CATEGORY_ID', values);
    },
    FETCH_UPDATED_POST_REPLY({ commit }, values) {
      commit('SET_UPDATED_POST_REPLY', values);
    },
    FETCH_REMOVED_POST_REPLY({ commit }, values) {
      commit('SET_REMOVED_POST_REPLY', values);
    },
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
    FETCH_OPTION_SELECT_LIST({ commit }, values) {
      commit('SET_OPTION_SELECT_LIST', values);
    },
  },
};
