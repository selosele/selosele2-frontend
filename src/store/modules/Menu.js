import { http } from "@/api";

/** 메뉴 Store */
export const Menu = {
  namespaced: true,
  state: () => ({
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
      return http.get('/menu/list/tree', { params: values.params })
      .then(res => {
        commit('SET_MENU', res.data);
      });
    },
  },
};
