import { http } from "@/api";

/** 블로그 환경설정 Store */
export const BlogConfig = {
  namespaced: true,
  state: () => ({
    data: null,
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
    GET_BLOG_CONFIG({ commit }, values) {
      return new Promise((resolve, reject) => {
        http.get('/blogconfig')
        .then(res => {
          commit('SET_BLOG_CONFIG', res.data);
          resolve(res.data);
        });
      });
    },
  },
};
