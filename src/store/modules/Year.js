import { http } from "@/api";
import { isNotEmpty } from "@/utils";

/** 연도별 모아보기 Store */
export const Year = {
  namespaced: true,
  state: () => ({
    /** 연도별 포스트 목록 */
    data: {},
  }),
  mutations: {
    SET_YEAR_POSTS(state, values) {

      // 더보기의 경우는 기존의 store 데이타에 쌓아 넣고
      if ('more' === values.flag) {
        state.data[values.year][0].push(...values.list[0]);
        return;
      }
      // 로그인, 로그아웃 시에는 store 데이타를 초기화한다.
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

      // store에 저장된 연도별 포스트 목록 데이타가 있으면 store의 데이타를 리턴하고
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

      // 없으면 HTTP 통신을 해서 받아온 데이타를 리턴한다.
      return new Promise((resolve, reject) => {
        http.get(`/post/year/${values.year}`, { params: values.paginationDto })
        .then(res => {
          commit('SET_YEAR_POSTS', {
            year: values.year,
            list: res.data,
            paginationDto: values.paginationDto,
            flag: values.flag,
          });

          resolve({
            [values.year]: res.data,
          });
        });
      });
    },
  },
};
