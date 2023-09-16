import { http } from "@/api";

/** 공통코드 Store */
export const Code = {
  namespaced: true,
  state: () => ({
    /** 공통코드 목록 */
    data: [],
  }),
  mutations: {
    SET_CODE(state, data) {
      state.data = data;
    },
  },
  actions: {
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
    LIST_CODE({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        http.get('/code')
        .then(resp => {
          const codeList = resp.data.filter(d => d.useYn === 'Y');

          dispatch('Code/FETCH_CODE', codeList,  { root: true });
          dispatch('Satisfaction/FETCH_CODE', codeList.filter(d => d.prefix === 'B01' || d.prefix === 'B02' || d.prefix === 'B03'),  { root: true });
          dispatch('Notification/FETCH_CODE', codeList.filter(d => d.prefix === 'D02'),  { root: true });

          commit('SET_CODE', resp.data);
          resolve(resp.data);
        });
      });
    },
  },
};
