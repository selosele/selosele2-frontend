<template>
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
          <app-sidebar></app-sidebar>
        </div>
      </div>

      <app-user-satisfaction v-if="($route.meta.showSatis && 'Y' === this.$store.state.BlogConfig.data.showSatisYn)">
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
  created() {
    this.initJwt();
    this.listCode();
    this.getBlogConfig();
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
    /** JWT 세팅 */
    initJwt() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
    /** 공통코드 목록 조회 */
    listCode() {
      this.$http.get('/code')
        .then(res => {
          const codeList = res.data.filter(d => 'Y' === d.useYn);
          this.$store.dispatch('Code/FETCH_CODE', codeList);
        });
    },
    /** 블로그 환경설정 정보 조회 */
    getBlogConfig() {
      this.$http.get('/blogconfig')
        .then(res => {
          this.$store.dispatch('BlogConfig/FETCH_BLOG_CONFIG', res.data);
          this.resStatus = 'ok';
          document.title = res.data.title;
        });
    },
    /** 모바일 메뉴 toggle */
    toggleMobileMenu(e) {
      const menu = this.$refs['menu'].$el;

      // if (menu.classList.contains('gnb--visible')) {
      //   return this.closeMobileMenu();
      // }

      document.body.classList.add('layer-opened');

      menu.classList.add('gnb--visible')
      menu.setAttribute('tabindex', 0);
      menu.focus();

      setTimeout(() => {
        menu.classList.add('gnb--animate');
      }, 150);
    },
    /** 메뉴 닫기 */
    closeMobileMenu() {
      const menu = this.$refs['menu'].$el;

      menu.classList.remove('gnb--animate');

      setTimeout(() => {
        menu.classList.remove('gnb--visible');
        document.body.classList.remove('layer-opened');
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
      if (1420 > window.outerWidth || 0 > window.pageYOffset) return;
      if (Math.abs(window.pageYOffset - this.lastScrollTop) < this.$refs['mainWrapper'].getOffsetTop()) return;

      this.scrollDown = window.pageYOffset < this.lastScrollTop;
      this.lastScrollTop = window.pageYOffset;
    },
  },
};
</script>

<style lang="scss">

</style>