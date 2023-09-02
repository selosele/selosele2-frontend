<template>
  <ui-loading :activeModel="$store.state.Loading.useLoading && !$store.state.Loading.isLoading"
              :opacity="$store.state.Loading.isInitialLoading ? 1 : 0.5"
              :fullPage="true"
              :color="'#538204'">
  </ui-loading>

  <app-skip-links></app-skip-links>

  <div id="body" :class="{ 'scroll-down': !scrollDown }">
    <app-header :resStatus="resStatus"
                @toggleMobileMenu="toggleMobileMenu($event)">
    </app-header>

    <app-menu ref="menu"
              @click.self="closeMobileMenuByWindow($event)">
    </app-menu>

    <app-main ref="mainWrapper">
      <div class="page__body">
        <div class="page__body--left" v-if="$route.meta.showSidebar">
          <router-view></router-view>
        </div>
        <router-view v-else></router-view>

        <div class="page__body--right" v-if="$route.meta.showSidebar">
          <app-sidebar :key="$store.state.Layout.sidebar"></app-sidebar>
        </div>
      </div>

      <app-user-satisfaction v-if="($route.meta.showSatis && 'Y' === $store.state.BlogConfig.data?.showSatisYn)">
      </app-user-satisfaction>
    </app-main>

    <app-footer></app-footer>
  </div>

  <modals-container></modals-container>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppMain from '@/components/layout/AppMain.vue';
import AppMenu from '@/components/layout/AppMenu.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppSkipLinks from '@/components/layout/AppSkipLinks.vue';
import AppUserSatisfaction from '@/components/layout/AppUserSatisfaction.vue';
import { ModalsContainer } from 'vue-final-modal';
import { isNotBlank } from './utils';

import '@vuepic/vue-datepicker/dist/main.css';

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
    };
  },
  async created() {
    // 애플리케이션 최초 로드 시, 화면 전체를 덮는 로딩을 일정 시간동안 실행
    this.initLoading(2500);

    this.initJwt();

    // 2023.08.12. 성능 이슈로 인해 동시 실행되도록 처리
    await Promise.all([
      this.listCode(),
      this.getBlogConfig(),
    ]);
  },
  mounted() {
    this.lastScrollTop = window.pageYOffset;
    window.document.addEventListener('scroll', this.onScroll);
  },
  unmounted() {
    window.document.removeEventListener('scroll', this.onScroll);
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
      return this.$http.get('/code')
      .then(res => {
        const codeList = res.data.filter(d => d.useYn === 'Y');
        
        this.$store.dispatch('Code/FETCH_CODE', codeList);
        this.$store.dispatch('Satisfaction/FETCH_CODE', codeList.filter(d => d.prefix === 'B01'));
      });
    },
    /** 블로그 환경설정 조회 */
    getBlogConfig() {
      if ('/' === this.$route.path) {
        this.$store.dispatch('Breadcrumb/FETCH_IS_INITIAL_LOAD', true);
      }
      
      this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '로딩 중...');
      this.$store.dispatch('Breadcrumb/FETCH_IS_INITIAL_LOAD', false);
      
      return this.$store.dispatch('BlogConfig/GET_BLOG_CONFIG')
      .then(data => {
        this.resStatus = 'ok';
        this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.$store.state.Breadcrumb.pageTitle);
        //window.document.title = data.title;
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
  },
};
</script>

<style lang="scss">

</style>