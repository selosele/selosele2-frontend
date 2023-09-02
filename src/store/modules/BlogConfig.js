import { http } from "@/api";
import store from "..";

/** 블로그 환경설정 Store */
export const BlogConfig = {
  namespaced: true,
  state: () => ({
    /** 블로그 환경설정 데이타 */
    data: null,
    /** 블로그 환경설정 미리보기 데이타 */
    previewData: null,
  }),
  mutations: {
    SET_BLOG_CONFIG(state, data) {
      state.data = data;
    },
    SET_PREVIEW_DATA(state, previewData) {
      state.previewData = previewData;
    },
  },
  actions: {
    FETCH_BLOG_CONFIG({ commit }, values) {
      commit('SET_BLOG_CONFIG', values);
    },
    FETCH_PREVIEW_DATA({ commit }, values) {
      commit('SET_PREVIEW_DATA', values);
    },
    GET_BLOG_CONFIG({ commit }) {
      return new Promise((resolve, reject) => {
        store.dispatch('Breadcrumb/FETCH_INITIAL_PAGE_TITLE');

        http.get('/blogconfig')
        .then(res => {
          commit('SET_BLOG_CONFIG', res.data);
          resolve(res.data);
        });
      });
    },
  },
};
