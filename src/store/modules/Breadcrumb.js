import { isNotEmpty } from "@/utils";
import store from "..";

/** Breadcrumb Store */
export const Breadcrumb = {
  namespaced: true,
  state: () => ({
    /** 현재 페이지 타이틀 */
    pageTitle: '',
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit }, pageTitle) {
      if (isNotEmpty(pageTitle)) {
        window.document.title = pageTitle;
      } else {
        window.document.title = store.state.BlogConfig.data?.title;
      }

      commit('SET_PAGE_TITLE', pageTitle);
    },
  },
};
