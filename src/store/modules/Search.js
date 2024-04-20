import router from '@/routes';

/** 검색 Store */
export const Search = {
  namespaced: true,
  state: () => ({
    /** 검색 코드 목록 */
    code: [],
    /** 선택 검색옵션 목록 */
    optionSelectList: [],
  }),
  mutations: {
    SET_CODE(state, code) {
      state.code = code;
    },
    SET_OPTION_SELECT_LIST(state, optionSelectList) {
      state.optionSelectList = optionSelectList;
    },
  },
  actions: {
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
    FETCH_OPTION_SELECT_LIST({ commit }, values) {
      commit('SET_OPTION_SELECT_LIST', values);
    },
    async GO_SEARCH({ commit }, values) {
      await router.push({
        path: '/search', 
        query: {
          q: values['q'], 
          t: values['t'], 
          c: values['c'],
          page: values['page'],
          pageSize: values['pageSize'],
        },
      });
    },
  },
};
