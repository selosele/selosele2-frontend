/** 포스트 Store */
export const Post = {
  namespaced: true,
  state: () => ({
    /** 메인 포스트 목록 */
    mainPostObj: {},
    /** 체크된 포스트 ID 목록 */
    checkList: [],
    /** 전체선택 체크박스 체크 여부 */
    checkAll: false,
  }),
  mutations: {
    SET_MAIN_POSTLIST(state, mainPostObj) {
      state.mainPostObj = mainPostObj;
    },
    SET_CHECKLIST(state, checkList) {
      state.checkList = checkList;
    },
    SET_CHECKALL(state, checkAll) {
      state.checkAll = checkAll;
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
  },
};
