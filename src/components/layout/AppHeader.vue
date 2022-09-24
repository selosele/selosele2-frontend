<template>
  <div id="masthead" class="masthead">
    <button type="button" id="menu_open" class="btn masthead__menu-open">
      <i class="xi-bars" aria-hidden="true"></i>
      <span class="sr-only">메뉴</span>
    </button>

    <div :class="['masthead__top', this.$store.state.config.og_image_url ? 'masthead--image' : '']"
         :style="[
          { backgroundImage: this.$store.state.config.og_image_url && getBackgroundImage() },
          { backgroundPositionX: this.$store.state.config.og_image_url && getBackgroundPosition('x') },
          { backgroundPositionY: this.$store.state.config.og_image_url && getBackgroundPosition('y') }
         ]">
      <div class="masthead__util-wrapper">
        <router-link to="/a/goto" class="btn masthead__util">
          <i class="xi-log-in" aria-hidden="true"></i>
          <span class="sr-only">로그인</span>
        </router-link>
      </div>

      <div class="masthead__inner">
        <div class="masthead__info">
          <router-link to="/" class="site-title">{{ this.$store.state.config.title }}</router-link>

          <div class="masthead__author">
            <p class="masthead__author-avatar" v-if="this.$store.state.config.avatar_image_url">
              <img :src=this.$store.state.config.avatar_image_url 
                   :alt=this.$store.state.config.author />
            </p>

            <p class="masthead__author-name">{{ this.$store.state.config.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    getBackgroundContrast() {
      return this.$store.state.config.og_image_contrast;
    },
    getBackgroundImageUrl() {
      return this.$store.state.config.og_image_url;
    },
    getBackgroundImage() {
      return 'linear-gradient(to bottom, rgba(0, 0, 0, '+this.getBackgroundContrast()+'), rgba(0, 0, 0, '+this.getBackgroundContrast()+')), url('+this.getBackgroundImageUrl()+')';
    },
    getBackgroundPosition(xy) {
      if (xy === 'x') {
        return this.$store.state.config.og_image_position_x + '%';
      }
      if (xy === 'y') {
        return this.$store.state.config.og_image_position_y + '%';
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>