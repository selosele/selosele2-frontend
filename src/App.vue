<template>
  <app-skip-links />

  <div id="body" :class="{ 'scroll-down': !scrollDown }">
    <app-header />

    <app-menu />

    <app-main ref="mainWrapper">
      <header :class="['page__header', $route.meta.pageType !== 'home' ? '' : 'sr-only']">
        <h1 class="page__title">
          {{ $route.meta.pageType !== 'home' ? $route.meta.title : '최근 포스트' }}
        </h1>
      </header>

      <div class="page__body">
        <div class="page__body--left" v-if="$route.meta.showSidebar !== false">
          <router-view />
        </div>
        <router-view v-else />

        <div class="page__body--right" v-if="$route.meta.showSidebar !== false">
          <app-sidebar />
        </div>
      </div>

      <app-satisfaction v-if="($route.meta.showSatis !== false
                               && this.$store.state.config.show_satisfaction === 'Y')" />
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
import AppSatisfaction from './components/layout/AppSatisfaction.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppMain,
    AppMenu,
    AppSidebar,
    AppSkipLinks,
    AppSatisfaction,
  },
  data() {
    return {
      scrollDown: true,
      lastScrollTop: 0,
    };
  },
  created() {
    this.$store.dispatch('FETCH_CONFIG');
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
      if (window.outerWidth < 1420 || window.pageYOffset < 0) {
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