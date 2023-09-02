import { isNotEmpty } from "@/utils";
import store from "..";

/** Breadcrumb Store */
export const Breadcrumb = {
  namespaced: true,
  state: () => ({
    /** 현재 페이지 타이틀 */
    pageTitle: '',
    /** 애플리케이션 최초 로드 여부 */
    isInitialLoad: false,
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
    SET_IS_INITIAL_LOAD(state, isInitialLoad) {
      state.isInitialLoad = isInitialLoad;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit, state }, pageTitle) {
      // 애플리케이션 최초 로드 시에는, 환경설정 데이타를 받아올 때까지 특정 페이지 타이틀 값을 보여준다.
      if (state.isInitialLoad) {
        window.document.title = pageTitle;
        return;
      }

      if (isNotEmpty(pageTitle)) {
        window.document.title = `${pageTitle} - ${store.state.BlogConfig.data?.title}`;
      } else {
        window.document.title = store.state.BlogConfig.data?.title;
      }

      commit('SET_PAGE_TITLE', pageTitle);
    },
    FETCH_IS_INITIAL_LOAD({ commit }, isInitialLoad) {
      commit('SET_IS_INITIAL_LOAD', isInitialLoad)
    },
  },
};
