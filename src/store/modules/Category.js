import { http } from "@/api";

/** 카테고리, 태그 Store */
export const Category = {
  namespaced: true,
  state: () => ({
    /** 카테고리 목록 */
    categoryList: [],
    /** 태그 목록 */
    tagList: [],
  }),
  mutations: {
    SET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    SET_TAG_LIST(state, tagList) {
      state.tagList = tagList;
    },
  },
  actions: {
    FETCH_CATEGORY_LIST({ commit }, values) {
      commit('SET_CATEGORY_LIST', values);
    },
    FETCH_TAG_LIST({ commit }, values) {
      commit('SET_TAG_LIST', values);
    },
    LIST_CATEGORY({ commit, dispatch, state }) {
      if (0 === state.categoryList.length) {
        http.get('/category/list/count')
        .then(resp => {
          commit('SET_CATEGORY_LIST', resp.data[0]);
          commit('SET_TAG_LIST', resp.data[1]);

          return Promise.resolve(resp.data);
        });
      } else {
        return Promise.resolve([
          state.categoryList,
          state.tagList,
        ]);
      }
    },
  },
};
