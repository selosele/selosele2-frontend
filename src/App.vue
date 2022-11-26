<template>
  <app-skip-links></app-skip-links>

  <div id="body" :class="{ 'scroll-down': !scrollDown }">
    <app-header :resStatus="resStatus"></app-header>

    <app-menu></app-menu>

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

      <app-user-satisfaction v-if="($route.meta.showSatis && 'Y' === this.$store.state.blogConfig.showSatisYn)">
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
    document.addEventListener('scroll', this.scroll);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scroll);
  },
  methods: {
    // JWT 세팅
    initJwt() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
    // 공통코드 목록 조회
    listCode() {
      this.$http.get('/code')
        .then(res => {
          this.$store.dispatch('FETCH_CODE', res.data);
        });
    },
    // 블로그 환경설정 정보 조회
    getBlogConfig() {
      this.$http.get('/blogconfig')
        .then(res => {
          this.$store.dispatch('FETCH_BLOG_CONFIG', res.data);
          this.resStatus = 'ok';
          document.title = res.data.title;
        });
    },
    scroll() {
      if (1420 > window.outerWidth || 0 > window.pageYOffset) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollTop) < this.$refs.mainWrapper.getOffsetTop()) {
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