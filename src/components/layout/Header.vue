<template>
  <div id="masthead" class="masthead">
    <button type="button" id="menu_open" class="btn masthead__menu-open">
      <i class="xi-bars" aria-hidden="true"></i>
      <span class="sr-only">메뉴</span>
    </button>

    <div class="masthead__top masthead--image" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(http://res.cloudinary.com/dbrgfvqgb/image/upload/v1643533394/foo/fantastic-blue-sky_zfjptv.png); background-position-x: 50%; background-position-y: 50%">
      <div class="masthead__util-wrapper">
        <router-link to="/a/goto" class="btn masthead__util">
          <i class="xi-log-in" aria-hidden="true"></i>
          <span class="sr-only">로그인</span>
        </router-link>
      </div>

      <div class="masthead__inner">
        <div class="masthead__info">
          <router-link to="/" class="site-title">개발일기장</router-link>

          <div class="masthead__author">
            <p class="masthead__author-avatar">
              <img src="http://res.cloudinary.com/dbrgfvqgb/image/upload/v1641389198/rgf9bfgraocf0lg3kagw.jpg" alt="Sel" />
            </p>

            <p class="masthead__author-name">Sel</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>