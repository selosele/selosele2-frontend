import { http } from "@/api";
import { isNotEmpty } from "@/utils";

/** 레이아웃 Store */
export const Layout = {
  namespaced: true,
  state: () => ({
    /** 페이지 타이틀 */
    pageTitle: '',
    /** 사이드바 */
    sidebar: {},
    /** 원본 사이드바 값 */
    originalSidebar: {},
    /** 변경 위젯 값 */
    changeWidget: {},
    /** 위젯관리 활성화 여부 */
    isActive: false,
    /** 메뉴 표시 여부 */
    isMenuVisible: false,
    /** 메뉴 애니메이션 활성화 여부 */
    isMenuAnimate: false,
    /** 사이드바 로딩 완료 여부 */
    isSidebarLoaded: false,
  }),
  mutations: {
    SET_PAGE_TITLE(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
    SET_SIDEBAR(state, sidebar) {
      state.sidebar = sidebar;
    },
    SET_ORIGINAL_SIDEBAR(state, originalSidebar) {
      state.originalSidebar = originalSidebar;
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
    SET_IS_MENU_VISIBLE(state, isMenuVisible) {
      state.isMenuVisible = isMenuVisible;
    },
    SET_IS_MENU_ANIMATE(state, isMenuAnimate) {
      state.isMenuAnimate = isMenuAnimate;
    },
    SET_IS_SIDEBAR_LOADED(state, isSidebarLoaded) {
      state.isSidebarLoaded = isSidebarLoaded;
    },
  },
  actions: {
    FETCH_PAGE_TITLE({ commit }, values) {
      commit('SET_PAGE_TITLE', values);
    },
    FETCH_SIDEBAR({ commit }, values) {
      commit('SET_SIDEBAR', values);
    },
    FETCH_ORIGINAL_SIDEBAR({ commit }, values) {
      commit('SET_ORIGINAL_SIDEBAR', values);
    },
    LIST_WIDGET({ commit }, values) {
      return new Promise((resolve, reject) => {
        http.get('/widget', { params: values?.params })
        .then(resp => {
          commit('SET_WIDGET', resp.data);
          resolve(resp.data);
        });
      });
    },
    FETCH_IS_ACTIVE({ commit }, values) {
      commit('SET_IS_ACTIVE', values);
    },
    FETCH_CHANGE_WIDGET({ commit }, values) {
      commit('SET_CHANGE_WIDGET', values);
    },
    FETCH_IS_MENU_VISIBLE({ commit }, values) {
      if (values.visible) {
        window.document.body.classList.add('layer-opened');
      } else {
        window.document.body.classList.remove('layer-opened');
      }

      if (isNotEmpty(values.el)) {
        values.el.setAttribute('tabindex', 0);
        values.el.focus();
      }

      commit('SET_IS_MENU_VISIBLE', values.visible);
    },
    FETCH_IS_MENU_ANIMATE({ commit }, values) {
      commit('SET_IS_MENU_ANIMATE', values);
    },
    FETCH_IS_SIDEBAR_LOADED({ commit }, values) {
      commit('SET_IS_SIDEBAR_LOADED', values);
    },
  },
};
