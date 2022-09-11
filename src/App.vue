<template>
  <div class="app__inner">
    <SkipLinks />

    <div id="body">
      <Header />

      <Menu />

      <Main>
        <header :class="['page__header', $route.meta.title !== null ? '' : 'sr-only']">
          <h1 class="page__title">
            {{ $route.meta.title !== null ? $route.meta.title : '최근 포스트' }}
          </h1>
        </header>

        <div class="page__body">
          <div class="page__body--left">
            <router-view />
          </div>

          <div class="page__body--right">
            <Sidebar />
          </div>
        </div>

        <Satisfaction />
      </Main>

      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import Main from './components/layout/Main.vue';
import Menu from './components/layout/Menu.vue';
import Sidebar from './components/layout/Sidebar.vue';
import SkipLinks from './components/layout/SkipLinks.vue';
import Satisfaction from './components/layout/Satisfaction.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Main,
    Menu,
    Sidebar,
    SkipLinks,
    Satisfaction,
  },
};
</script>

<style lang="scss"></style>
