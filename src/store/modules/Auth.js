import { isBlank, isNotBlank } from '@/utils/common/commonUtil';
import { http } from '@/api';
import router from '@/routes';
import { messageUtil } from '@/utils';
import jwtDecode from 'jwt-decode';

/** 인증 Store */
export const Auth = {
  namespaced: true,
  state: () => ({
    /** 액세스 토큰 */
    accessToken: null,
    /** 관리자 여부 */
    isAdmin: false,
  }),
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      window.localStorage.setItem('accessToken', accessToken);
      state.accessToken = accessToken;
    },
    CLEAR_ACCESS_TOKEN(state) {
      window.localStorage.removeItem('accessToken');
      state.accessToken = null;
    },
    SET_IS_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    /** 로그인 */
    LOGIN({ commit, dispatch }, values) {
      return new Promise((resolve, reject) => {
        commit('Auth/SET_ACCESS_TOKEN', values, { root: true });
        dispatch('Auth/FETCH_IS_ADMIN', 'ROLE_ADMIN', { root: true });
        commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
        commit('Year/SET_YEAR_POST', { flag: 'reset' }, { root: true });
        commit('Year/SET_YEAR_LIST', [], { root: true });
        dispatch('Guestbook/FETCH_GUESTBOOK_LIST', [], { root: true });
        commit('Layout/SET_SIDEBAR', {}, { root: true });
        commit('Category/SET_TAG_LIST', [], { root: true });
        commit('Category/SET_CATEGORY_LIST', [], { root: true });
        commit('Category/SET_CATEGORY_SELECT_LIST', [], { root: true });
        dispatch('Category/LIST_CATEGORY', [], { root: true });
        dispatch('Menu/LIST_MENU', {
          params: {
            useYn: 'Y',
          },
        }, { root: true });
        dispatch('Notification/LIST_NOTIFICATION', {}, { root: true });

        resolve(isNotBlank(values) ? 'OK' : 'NO');
      });
    },
    /** 로그아웃 */
    LOGOUT({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        http.post('/auth/signout')
        .then(resp => {
          http.defaults.headers.common['Authorization'] = '';
          
          commit('Loading/SET_IS_LOADING', false, { root: true });
          commit('Auth/CLEAR_ACCESS_TOKEN', null, { root: true });
          dispatch('Auth/FETCH_IS_ADMIN', 'ROLE_ADMIN', { root: true });
          commit('Post/SET_MAIN_POSTLIST', {}, { root: true });
          commit('Year/SET_YEAR_POST', { flag: 'reset' }, { root: true });
          commit('Year/SET_YEAR_LIST', [], { root: true });
          dispatch('Guestbook/FETCH_GUESTBOOK_LIST', [], { root: true });
          commit('Layout/SET_SIDEBAR', {}, { root: true });
          commit('Category/SET_TAG_LIST', [], { root: true });
          commit('Category/SET_CATEGORY_LIST', [], { root: true });
          commit('Category/SET_CATEGORY_SELECT_LIST', [], { root: true });
          dispatch('Category/LIST_CATEGORY', [], { root: true });
          dispatch('Menu/LIST_MENU', {
            params: {
              useYn: 'Y',
            },
          }, { root: true });

          router.push('/login');
        }).catch(err => {
          
          // 리프레시 토큰 오류로 인해 로그아웃이 불가한 경우, 액세스 토큰을 삭제한다.
          if (401 === err?.response?.status) {
            messageUtil.toastError('인증 오류가 발생했습니다.');

            commit('Auth/CLEAR_ACCESS_TOKEN', null, { root: true });
            router.push('/login');
          }
        });
      });
    },
    /** JWT에서 사용자 정보 추출 후 반환 */
    GET_USER({ commit, dispatch }) {
      const accessToken = window.localStorage.getItem('accessToken');

      if (isBlank(accessToken)) {
        return null;
      }

      return jwtDecode(accessToken);
    },
    /** 1개의 권한 확인 */
    async HAS_ROLE({ commit, dispatch }, role) {
      const user = await dispatch('Auth/GET_USER', null, { root: true });
    
      if (!user) return false;

      for (const { roleId } of user.userRole) {
        if (role === roleId) {
          return true;
        }
      }
      
      return false;
    },
    /** 모든 권한이 있는지 확인 */
    async HAS_ROLE_ALL({ commit, dispatch }, ...roles) {
      const user = await dispatch('Auth/GET_USER', null, { root: true });

      if (!user) return false;

      return roles.every(v => user.userRole.filter(r => r.roleId === v).length > 0);
    },
    /** 권한이 1개라도 있는지 확인 */
    async HAS_ROLE_OR({ commit, dispatch }, ...roles) {
      const user = await dispatch('Auth/GET_USER', null, { root: true });

      if (!user) return false;

      return roles.some(v => user.userRole.filter(r => r.roleId === v).length > 0);
    },
    async FETCH_IS_ADMIN({ commit, dispatch }, values) {
      const isAdmin = await dispatch('Auth/HAS_ROLE', values, { root: true });

      commit('SET_IS_ADMIN', isAdmin);
    },
  },
};
