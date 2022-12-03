/**
 * 인증·인가 Store
 */
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
        resolve('ok');
      });
    },
    LOGOUT({ commit }, http) {
      return new Promise((resolve, reject) => {
        http.defaults.headers.common['Authorization'] = '';
        commit('Auth/CLEAR_TOKEN', null, { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        resolve('ok');
      });
    },
  },
};
