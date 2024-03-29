import { http } from '@/api';

/** 카테고리, 태그 Store */
export const Category = {
  namespaced: true,
  state: () => ({
    /** 카테고리 목록 */
    categoryList: [],
    /** 선택 카테고리 목록 */
    categorySelectList: [],
    /** 태그 목록 */
    tagList: [],
  }),
  mutations: {
    SET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    SET_CATEGORY_SELECT_LIST(state, categorySelectList) {
      state.categorySelectList = categorySelectList;
    },
    SET_TAG_LIST(state, tagList) {
      state.tagList = tagList;
    },
  },
  actions: {
    FETCH_CATEGORY_LIST({ commit }, values) {
      commit('SET_CATEGORY_LIST', values);
    },
    FETCH_CATEGORY_SELECT_LIST({ commit }, values) {
      commit('SET_CATEGORY_SELECT_LIST', values);
    },
    FETCH_TAG_LIST({ commit }, values) {
      commit('SET_TAG_LIST', values);
    },
    LIST_CATEGORY({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        if (0 === state.categoryList.length) {
          http.get('/category/list/count')
          .then(resp => {
            commit('SET_CATEGORY_LIST', resp.data[0]);
            commit('SET_TAG_LIST', resp.data[1]);

            const categorySelectList = [
              {
                value: '0',
                text: '전체',
              },
              ...resp.data[0].map(d => ({
                value: d.id,
                text: d.nm,
              }))
            ];
      
            dispatch('Category/FETCH_CATEGORY_SELECT_LIST', categorySelectList, { root: true });
            resolve(resp.data);
          });
        } else {
          resolve([
            state.categoryList,
            state.tagList,
          ]);
        }
      });
    },
  },
};
