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
    LIST_MENU({ commit }, values) {
      values.client.get('/menu/list/tree', { params: values.params })
      .then(res => {
        commit('SET_MENU', res.data);
      });
    },
  },
};
