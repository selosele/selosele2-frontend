<template>
  <app-skip-links />

  <div id="body" :class="{ 'scroll-down': !scrollDown }">
    <app-header :resStatus="resStatus" />

    <app-menu />

    <app-main ref="mainWrapper">
      <header :class="[
        'page__header',
        $route.meta.pageType !== 'home' ? '' : 'sr-only'
        ]">
        <h1 class="page__title">
          {{ $route.meta.pageType !== 'home' ? $route.meta.title : '최근 포스트' }}
        </h1>
      </header>

      <div class="page__body">
        <div class="page__body--left" v-if="$route.meta.showSidebar">
          <router-view />
        </div>
        <router-view v-else />

        <div class="page__body--right" v-if="$route.meta.showSidebar">
          <app-sidebar />
        </div>
      </div>

      <app-user-satisfaction v-if="($route.meta.showSatis
                                    && this.$store.getters.blogConfig.showSatisYn === 'Y')" />
    </app-main>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import AppMain from './components/layout/AppMain.vue';
import AppMenu from './components/layout/AppMenu.vue';
import AppSidebar from './components/layout/AppSidebar.vue';
import AppSkipLinks from './components/layout/AppSkipLinks.vue';
import AppUserSatisfaction from './components/layout/AppUserSatisfaction.vue';

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
  },
  data() {
    return {
      resStatus: '',
      scrollDown: true,
      lastScrollTop: 0,
    };
  },
  created() {
    // JWT 세팅
    const token = localStorage.getItem('token');
    if (token) {
      this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // 공통코드
    this.$http.get('/code/list')
      .then(res => {
        this.$store.dispatch('FETCH_CODE', res.data);
      });

    // 블로그 환경설정
    this.$http.get('/blogconfig')
      .then(res => {
        this.$store.dispatch('FETCH_BLOG_CONFIG', res.data);
        this.resStatus = 'ok';
        document.title = res.data.title;
      });
  },
  mounted() {
    this.lastScrollTop = window.pageYOffset;
    document.addEventListener('scroll', this.scroll);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scroll);
  },
  methods: {
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

<style lang="scss"></style>