<template>
  <div id="masthead" class="masthead">
    <button type="button" id="menu_open" class="btn masthead__menu-open">
      <i class="xi-bars" aria-hidden="true"></i>
      <span class="sr-only">메뉴</span>
    </button>

    <div :class="['masthead__top', this.$store.state.blogConfig.ogImgUrl ? 'masthead--image' : '']"
         :style="[
          { backgroundImage: this.$store.state.blogConfig.ogImgUrl && getBackgroundImage() },
          { backgroundPositionX: this.$store.state.blogConfig.ogImgUrl && getBackgroundPosition('x') },
          { backgroundPositionY: this.$store.state.blogConfig.ogImgUrl && getBackgroundPosition('y') }
         ]">
      <div class="masthead__util-wrapper">
        <template v-if="!isLogin && !this.$store.state.isProduction">
          <router-link to="/a/goto" class="btn masthead__util">
            <i class="xi-log-in" aria-hidden="true"></i>
            <span class="sr-only">로그인</span>
          </router-link>
        </template>

        <template v-if="isLogin">
          <button type="button"
                  class="btn masthead__util"
                  @click="logout">
            <i class="xi-power-off" aria-hidden="true"></i>
            <span class="sr-only">로그아웃</span>
          </button>
  
          <router-link to="/blogconfig" class="btn masthead__util">
            <i class="xi-cog" aria-hidden="true"></i>
            <span class="sr-only">환경설정</span>
          </router-link>
        </template>
      </div>

      <div class="masthead__inner">
        <div class="masthead__info">
          <router-link to="/" class="site-title">{{ this.$store.state.blogConfig.title }}</router-link>

          <div class="masthead__author">
            <p class="masthead__author-avatar" v-if="this.$store.state.blogConfig.avatarImgUrl">
              <img :src=this.$store.state.blogConfig.avatarImgUrl 
                   :alt=this.$store.state.blogConfig.author />
            </p>

            <p class="masthead__author-name">{{ this.$store.state.blogConfig.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authComputed } from '@/store/helper';
import dialog from '@/utils/ui/Dialog';

export default {
  name: 'app-header',
  computed: {
    ...authComputed
  },
  methods: {
    async logout() {
      const confirm = await dialog.confirm('로그아웃하시겠습니까?', '', 'question');
      if (!confirm) {
        return;
      }
      this.$store.dispatch('LOGOUT')
        .then(res => {
          this.$router.push('/');
        });
    },
    getBackgroundContrast() {
      return this.$store.state.blogConfig.ogImgContrast;
    },
    getBackgroundImageUrl() {
      return this.$store.state.blogConfig.ogImgUrl;
    },
    getBackgroundImage() {
      return `linear-gradient(to bottom, rgba(0, 0, 0, ${this.getBackgroundContrast()}), rgba(0, 0, 0, ${this.getBackgroundContrast()})), url(${this.getBackgroundImageUrl()})`;
    },
    getBackgroundPosition(xy) {
      if (xy === 'x') {
        return `${this.$store.state.blogConfig.ogImgPosX}%`;
      }
      if (xy === 'y') {
        return `${this.$store.state.blogConfig.ogImgPosY}%`;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';

.masthead__top {
  &:not(.masthead--image) {
    background-color: $main-color
  }
}
</style>