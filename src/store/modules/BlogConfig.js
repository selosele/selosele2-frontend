import { http } from '@/api';

/** 블로그 환경설정 Store */
export const BlogConfig = {
  namespaced: true,
  state: () => ({
    /** 블로그 환경설정 정보 */
    data: null,
    /** 블로그 환경설정 미리보기 데이터 */
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
        http.get('/blogconfig', { params: { useYn: 'Y' } })
        .then(resp => {
          commit('SET_BLOG_CONFIG', resp.data);
          resolve(resp.data);
        });
      });
    },
  },
};
