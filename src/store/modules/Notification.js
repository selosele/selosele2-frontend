import { http } from "@/api";

/** 알림 Store */
export const Notification = {
  namespaced: true,
  state: () => ({
    /** 알림 목록 */
    notiList: [],
    /** 알림 개수 */
    notiCnt: 0,
  }),
  mutations: {
    SET_NOTIFICATION(state, data) {
      state.notiList = [...data[0]];
      state.notiCnt = data[1];
    },
  },
  actions: {
    FETCH_NOTIFICATION({ commit }, values) {
      commit('SET_NOTIFICATION', values);
    },
    LIST_NOTIFICATION({ commit }) {
      return new Promise((resolve, reject) => {
        http.get('/notification')
        .then(res => {
          commit('SET_NOTIFICATION', res.data);
          resolve(res.data);
        });
      });
    },
  },
};
