import { isNotBlank } from "@/utils/common/commonUtil";
import { AuthService } from "@/services/auth/authService";
import { http } from "@/api";
import router from "@/routes";
import { messageUtil } from "@/utils";

/** 인증 Store */
export const Auth = {
  namespaced: true,
  state: () => ({
    /** 액세스 토큰 */
    accessToken: null,
  }),
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      new AuthService().setAccessToken(accessToken);
    },
    CLEAR_ACCESS_TOKEN(state) {
      state.accessToken = null;
      new AuthService().removeAccessToken();
    },
  },
  actions: {
    LOGIN({ commit, dispatch }, values) {
      return new Promise((resolve, reject) => {
        commit('Auth/SET_ACCESS_TOKEN', values, { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Year/SET_YEAR_POSTS', { flag: 'reset' }, { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        dispatch('Menu/LIST_MENU', {
          params: {
            useYn: 'Y',
          },
        }, { root: true });
        dispatch('Notification/LIST_NOTIFICATION', {}, { root: true });

        resolve(isNotBlank(values) ? 'ok' : 'no');
      });
    },
    LOGOUT({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        http.post('/auth/signout')
        .then(res => {
          http.defaults.headers.common['Authorization'] = '';
          
          commit('Loading/SET_IS_LOADING', false, { root: true });
          commit('Auth/CLEAR_ACCESS_TOKEN', null, { root: true });
          commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
          commit('Year/SET_YEAR_POSTS', { flag: 'reset' }, { root: true });
          commit('Layout/SET_SIDEBAR', {}, { root: true });
          dispatch('Menu/LIST_MENU', {
            params: {
              useYn: 'Y',
            },
          }, { root: true });

          resolve('ok');
        }).catch(err => {
          
          // 리프레시 토큰 오류로 인해 로그아웃이 불가한 경우, 액세스 토큰을 삭제한다.
          if (401 === err?.response?.status) {
            messageUtil.toastError('인증 오류가 발생했습니다.');

            new AuthService().removeAccessToken();
            commit('Auth/CLEAR_ACCESS_TOKEN', null, { root: true });
            router.push('/a/goto');
          }
        });
      });
    },
  },
};
