import { http } from '@/api';

/** 메뉴 Store */
export const Menu = {
  namespaced: true,
  state: () => ({
    /** 메뉴 목록 */
    data: [],
  }),
  mutations: {
    SET_MENU(state, data) {
      state.data = data;
    },
  },
  actions: {
    FETCH_MENU({ commit }, values) {
      commit('SET_MENU', values);
    },
    async LIST_MENU({ commit }, values) {
      return new Promise((resolve, reject) => {
        http.get('/menu/list/tree', { params: values?.params })
        .then(resp => {
          commit('SET_MENU', resp.data);
          resolve(resp.data);
        });
      })
    },
  },
};
