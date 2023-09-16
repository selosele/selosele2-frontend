import { http } from "@/api";

/** 알림 Store */
export const Notification = {
  namespaced: true,
  state: () => ({
    /** 알림 목록 */
    notiList: [],
    /** 알림 개수 */
    notiCnt: 0,
    /** 알림 코드 목록 */
    code: [],
  }),
  mutations: {
    SET_NOTIFICATION(state, data) {
      state.notiList = [...data[0]];
      state.notiCnt = data[1];
    },
    SET_CODE(state, code) {
      state.code = code;
    },
  },
  actions: {
    FETCH_NOTIFICATION({ commit }, values) {
      commit('SET_NOTIFICATION', values);
    },
    LIST_NOTIFICATION({ commit }) {
      return new Promise((resolve, reject) => {
        http.get('/notification')
        .then(resp => {
          commit('SET_NOTIFICATION', resp.data);
          resolve(resp.data);
        });
      });
    },
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
  },
};
