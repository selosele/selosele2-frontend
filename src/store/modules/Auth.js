import { isNotBlank } from "@/utils/common/commonUtil";

/** 인증·인가 Store */
export const Auth = {
  namespaced: true,
  state: () => ({
    accessToken: null,
  }),
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
    CLEAR_ACCESS_TOKEN(state) {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
  actions: {
    LOGIN({ commit }, values) {
      return new Promise((resolve, reject) => {
        commit('Auth/SET_ACCESS_TOKEN', values, { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        commit('Menu/SET_MENU', [], { root: true });
        resolve(isNotBlank(values) ? 'ok' : 'no');
      });
    },
    LOGOUT({ commit }, client) {
      return new Promise((resolve, reject) => {
        client.defaults.headers.common['Authorization'] = '';
        commit('Auth/CLEAR_ACCESS_TOKEN', null, { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        commit('Menu/SET_MENU', [], { root: true });
        resolve('ok');
      });
    },
  },
};
