import { isNotBlank } from "@/utils/common/commonUtil";

/** 인증·인가 Store */
export const Auth = {
  namespaced: true,
  state: () => ({
    token: null,
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    LOGIN({ commit }, values) {
      return new Promise((resolve, reject) => {
        commit('Auth/SET_TOKEN', values, { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        commit('Menu/SET_MENU', [], { root: true });
        resolve(isNotBlank(values) ? 'ok' : 'no');
      });
    },
    LOGOUT({ commit }, client) {
      return new Promise((resolve, reject) => {
        client.defaults.headers.common['Authorization'] = '';
        commit('Auth/CLEAR_TOKEN', null, { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        commit('Menu/SET_MENU', [], { root: true });
        resolve('ok');
      });
    },
  },
};
