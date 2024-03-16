import { http } from '@/api';

/** 공통코드 Store */
export const Code = {
  namespaced: true,
  state: () => ({
    /** 공통코드 목록 */
    data: [],
  }),
  mutations: {
    SET_CODE(state, data) {
      state.data = data;
    },
  },
  actions: {
    FETCH_CODE({ commit }, values) {
      commit('SET_CODE', values);
    },
    LIST_CODE({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        http.get('/code')
        .then(resp => {
          const codeList = resp.data.filter(d => d.useYn === 'Y');
          const optionSelectList = codeList
            .filter(d => d.prefix === 'A01')
            .map(d => ({
              value: d.val,
              text: d.nm,
            }));

          dispatch('Search/FETCH_OPTION_SELECT_LIST', optionSelectList,  { root: true });

          dispatch('Code/FETCH_CODE',               codeList, { root: true });
          dispatch('Post/FETCH_CODE',               codeList.filter(d => d.prefix === 'F01'),  { root: true });
          dispatch('Satisfaction/FETCH_CODE',       codeList.filter(d => d.prefix === 'B01' || d.prefix === 'B02' || d.prefix === 'B03'),  { root: true });
          dispatch('Notification/FETCH_CODE',       codeList.filter(d => d.prefix === 'D02'),  { root: true });
          dispatch('Guestbook/FETCH_CODE',          codeList.filter(d => d.prefix === 'F01'),  { root: true });
          dispatch('Search/FETCH_CODE',             codeList.filter(d => d.prefix === 'A01' || d.prefix === 'D03'),  { root: true });

          commit('SET_CODE', resp.data);
          resolve(resp.data);
        });
      });
    },
  },
};
