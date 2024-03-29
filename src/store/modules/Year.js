import moment from 'moment';
import { http } from '@/api';
import { isNotEmpty } from '@/utils';

/** 연도별 모아보기 Store */
export const Year = {
  namespaced: true,
  state: () => ({
    /** 연도별 포스트 목록 */
    data: {},
  }),
  mutations: {
    SET_YEAR_POSTS(state, values) {

      // 더보기의 경우는 기존의 store 데이터에 쌓아 넣고
      if ('more' === values.flag) {
        state.data[values.year][0].push(...values.list[0]);
        return;
      }
      // 로그인, 로그아웃 시에는 store 데이터를 초기화한다.
      else if ('reset' === values.flag) {
        state.data = {};
        return;
      }

      state.data[values.year] = values.list;
      state.data[values.year].paginationDto = values.paginationDto;
    },
  },
  actions: {
    GET_YEAR_POSTS({ commit, state }, values) {

      // store에 저장된 연도별 포스트 목록 데이터가 있으면 store의 데이터를 반환하고
      if (isNotEmpty(state.data[values.year]) && 'new' === values.flag) {
        commit('SET_YEAR_POSTS', {
          year: values.year,
          list: state.data[values.year],
          paginationDto: values.paginationDto,
          flag: values.flag,
        });

        return Promise.resolve({
          [values.year]: state.data[values.year],
        });
      }

      // 없으면 HTTP 통신을 해서 받아온 데이터를 반환한다.
      return new Promise((resolve, reject) => {
        http.get(`/post/year/${values.year}`, { params: values.paginationDto })
        .then(resp => {
          resp.data[0].forEach(d => {
            const date = new Date(d.regDate);
            d.regDate = moment(date).format('YYYY.MM.DD');
          });

          commit('SET_YEAR_POSTS', {
            year: values.year,
            list: resp.data,
            paginationDto: values.paginationDto,
            flag: values.flag,
          });

          resolve({
            [values.year]: resp.data,
          });
        });
      });
    },
  },
};
