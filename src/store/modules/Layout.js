import { http } from "@/api";

/** 레이아웃 Store */
export const Layout = {
  namespaced: true,
  state: () => ({
    /** 페이지 타이틀 */
    pageTitle: '',
    /** 사이드바 */
    sidebar: {},
    /** 위젯관리 활성화 여부 */
    isActive: false,
    /** 변경 위젯 값 */
    changeWidget: {},
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
    SET_SIDEBAR(state, sidebar) {
      state.sidebar = sidebar;
    },
    SET_WIDGET(state, widget) {
      state.sidebar.widget = widget;
    },
    SET_IS_ACTIVE(state, isActive) {
      state.isActive = isActive;
    },
    SET_CHANGE_WIDGET(state, changeWidget) {
      state.changeWidget = changeWidget;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit }, values) {
      commit('SET_PAGE_TITLE', values);
    },
    FETCH_SIDEBAR({ commit }, values) {
      commit('SET_SIDEBAR', values);
    },
    LIST_WIDGET({ commit }, values) {
      return new Promise((resolve, reject) => {
        http.get('/widget', { params: values?.params })
        .then(res => {
          commit('SET_WIDGET', res.data);
          resolve(res.data);
        });
      });
    },
    FETCH_IS_ACTIVE({ commit }, values) {
      commit('SET_IS_ACTIVE', values);
    },
    FETCH_CHANGE_WIDGET({ commit }, values) {
      commit('SET_CHANGE_WIDGET', values);
    },
  },
};
