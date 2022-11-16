<template>
  <div id="masthead" class="masthead">
    <button type="button" id="menu_open" class="btn masthead__menu-open">
      <i class="xi-bars" aria-hidden="true"></i>
      <span class="sr-only">메뉴</span>
    </button>

    <div :class="[
      'masthead__top',
      { 'masthead--image': this.$store.state.blogConfig.ogImgUrl }]"
         :style="[
          { backgroundImage: this.$store.state.blogConfig.ogImgUrl && getBackgroundImage() },
          { backgroundPositionX: this.$store.state.blogConfig.ogImgUrl && getBackgroundPosition('x') },
          { backgroundPositionY: this.$store.state.blogConfig.ogImgUrl && getBackgroundPosition('y') }
         ]">
      <div class="masthead__util-wrapper">
        <template v-if="!isLogin && isDevelopment">
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
  
          <router-link to="/admin/blogconfig" class="btn masthead__util">
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
              <ui-skeletor v-if="!dataLoaded" />
              <img v-else
                   :src=this.$store.state.blogConfig.avatarImgUrl 
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
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import messageUtil from '@/utils/ui/MessageUtil';

export default {
  name: 'app-header',
  props: {
    resStatus: String,
  },
  components: {
    UiSkeletor,
  },
  data() {
    return {
      dataLoaded: false,
    }
  },
  watch: {
    resStatus() {
      // 데이타를 받아오는 동안에도 실행되므로, props값의 변경을 감지해줘야 한다.
      this.dataLoading(this.resStatus);
    },
  },
  methods: {
    async logout() {
      const confirm = await messageUtil.confirmQuestion('로그아웃하시겠습니까?');
      if (!confirm) return;

      const res = await this.$store.dispatch('LOGOUT');
      if ('ok' === res) {
        this.$http.defaults.headers.common['Authorization'] = '';
        this.$router.push('/a/goto');
      }
    },
    getBackgroundContrast() {
      return this.$store.state.blogConfig.ogImgContrast;
    },
    getBackgroundImageUrl() {
      return this.$store.state.blogConfig.ogImgUrl;
    },
    getBackgroundImage() {
      return `linear-gradient(
                to bottom,
                rgba(0, 0, 0, ${this.getBackgroundContrast()}),
                rgba(0, 0, 0, ${this.getBackgroundContrast()})),
                url(${this.getBackgroundImageUrl()}
              )`;
    },
    getBackgroundPosition(xy) {
      if ('x' === xy) {
        return `${this.$store.state.blogConfig.ogImgPosX}%`;
      }
      if ('y' === xy) {
        return `${this.$store.state.blogConfig.ogImgPosY}%`;
      }
    },
    // 데이타 로딩
    dataLoading(resStatus) {
      return Promise.resolve(
        setTimeout(() => {
          if ('ok' === resStatus) {
            this.dataLoaded = true;
          }
        }, 500)
      );
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>