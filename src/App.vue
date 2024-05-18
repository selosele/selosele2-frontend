<template>
  <ui-loading
    :activeModel="$store.state.Loading.useLoading && !$store.state.Loading.isLoading"
    :opacity="$store.state.Loading.isInitialLoading ? 1 : 0.5"
    :fullPage="true"
    :color="'#538204'"
  />

  <app-skip-links />

  <div id="body" :class="{ 'scroll-down': !scrollDown }">
    <app-header
      :resStatus="resStatus"
      @toggleMobileMenu="toggleMobileMenu($event)"
    />

    <app-menu
      ref="menu"
      @click.self="closeMobileMenuByWindow($event)"
    />

    <app-main ref="mainWrapper">
      <div class="page__body">
        <ui-notice v-if="isAdmin && isNoticeShow">
          연말이 다가옵니다. 회고 작성은 하고 계시나요?
        </ui-notice>

        <div class="page__body--left" v-if="$route.meta.showSidebar">
          <!--
            2024.04.20.
            동일한 컴포넌트에서 페이지 URL이 바뀌면 컴포넌트를 리렌더링하도록 :key="$route.fullPath" 추가
            퀵검색 및 검색페이지에서 리렌더링이 안되는 이슈가 있었음
          -->
          <router-view :key="$route.fullPath" />
        </div>
        <router-view v-else />

        <div class="page__body--right" v-if="$route.meta.showSidebar">
          <app-sidebar :key="$store.state.Layout.sidebar" />
        </div>
      </div>

      <app-user-satisfaction
        v-if="($route.meta.showSatis && 'Y' === $store.state.BlogConfig.data?.showSatisYn)"
      />
    </app-main>

    <app-footer />
  </div>

  <modals-container />
</template>

<script>
import moment from 'moment';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppMain from '@/components/layout/AppMain.vue';
import AppMenu from '@/components/layout/AppMenu.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppSkipLinks from '@/components/layout/AppSkipLinks.vue';
import AppUserSatisfaction from '@/components/layout/AppUserSatisfaction.vue';
import { isNotBlank } from '@/utils';
import { ModalsContainer } from 'vue-final-modal';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppMain,
    AppMenu,
    AppSidebar,
    AppSkipLinks,
    AppUserSatisfaction,
    ModalsContainer,
  },
  data() {
    return {
      resStatus: '',
      scrollDown: true,
      lastScrollTop: 0,
      isNoticeShow: false,
    };
  },
  async created() {
    // 애플리케이션 최초 로드 시, 화면 전체를 덮는 로딩을 일정 시간동안 실행
    this.initLoading(1500);

    this.initJwt();
    this.showNotice();

    // 2023.08.12. 성능 이슈로 인해 동시 실행되도록 처리
    await Promise.all([
      this.listCode(),
      this.getBlogConfig(),
    ]);
  },
  mounted() {
    this.lastScrollTop = window.pageYOffset;
    document.addEventListener('scroll', this.onScroll);
  },
  unmounted() {
    document.removeEventListener('scroll', this.onScroll);
  },
  watch: {
    '$route'() {
      if (1420 < window.outerWidth) return;
      this.closeMobileMenu();
    },
  },
  methods: {
    /** 로딩 세팅 */
    initLoading(delay) {
      setTimeout(() => {
        this.$store.commit('Loading/SET_IS_LOADING', true);
        this.$store.commit('Loading/SET_IS_INITIAL_LOADING', false);
      }, delay);
    },
    /** JWT 세팅 */
    initJwt() {
      const accessToken = window.localStorage.getItem('accessToken');
      
      if (isNotBlank(accessToken)) {
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
    },
    /** 공통코드 목록 조회 */
    listCode() {
      return this.$store.dispatch('Code/LIST_CODE');
    },
    /** 블로그 환경설정 조회 */
    getBlogConfig() {
      return this.$store.dispatch('BlogConfig/GET_BLOG_CONFIG')
      .then(async data => {
        this.resStatus = 'OK';

        if ('/' === this.$route.path) {
          
          // await 키워드를 붙여서 비동기 방식으로 처리되도록 해줘야 값을 불러오는 동안 document.title = undefined가 되지 않는다.
          await this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', data?.title);
        }
      });
    },
    /** 모바일 메뉴 toggle */
    toggleMobileMenu(e) {
      const menu = this.$refs['menu'].$el;

      this.$store.dispatch('Layout/FETCH_IS_MENU_VISIBLE', { visible: true, el: menu });
      
      setTimeout(() => {
        this.$store.dispatch('Layout/FETCH_IS_MENU_ANIMATE', true);
      }, 150);
    },
    /** 메뉴 닫기 */
    closeMobileMenu() {
      this.$store.dispatch('Layout/FETCH_IS_MENU_ANIMATE', false);

      setTimeout(() => {
        this.$store.dispatch('Layout/FETCH_IS_MENU_VISIBLE', { visible: false, el: null });
      }, 150);
    },
    /** 바깥 영역 클릭해서 메뉴 닫기 */
    closeMobileMenuByWindow(e) {
      if (e.target === e.currentTarget) {
        this.closeMobileMenu();
      }
    },
    /** 메뉴 스크롤 */
    onScroll() {
      if (1420 > window.outerWidth || 0 > window.pageYOffset) {
        return;
      }
      
      if (Math.abs(window.pageYOffset - this.lastScrollTop) < this.$refs['mainWrapper'].getOffsetTop()) {
        return;
      }

      this.scrollDown = window.pageYOffset < this.lastScrollTop;
      this.lastScrollTop = window.pageYOffset;
    },
    /** 알림창 표출 */
    showNotice() {
      const nowDate = moment().format('YYYY-MM-DD');
      const nowYear = new Date().getFullYear();
      const isDateConfirmed = moment(nowDate).isBetween(`${nowYear}-12-17`, `${nowYear}-12-31`, undefined, '[]');

      // 현재 날짜가 12월 17일부터 12월 31일 사이일 경우 알림창을 표출한다.
      if (isDateConfirmed) {
        this.isNoticeShow = true;
      }
    },
  },
}
</script>

<style lang="scss">

</style>