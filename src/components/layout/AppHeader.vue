<template>
  <div class="masthead__wrapper">
    <div id="masthead" class="masthead">
      <ui-icon-button ref="btnMenu"
                      :icon="'xi-bars'"
                      :text="'메뉴'"
                      :class="'masthead__menu-open'"
                      @click="toggleMobileMenu">
      </ui-icon-button>

      <div :class="[
            'masthead__top',
            { 'masthead--image': $store.state.BlogConfig.data.ogImgUrl }]"
           :style="[
            { backgroundImage: $store.state.BlogConfig.data.ogImgUrl && backgroundImage },
            { backgroundPositionX: $store.state.BlogConfig.data.ogImgUrl && backgroundPosition('x') },
            { backgroundPositionY: $store.state.BlogConfig.data.ogImgUrl && backgroundPosition('y') }
           ]"
           :data-blur="($store.state.BlogConfig.data.ogImgBlur / 20) + 'rem'"
        >
        <div class="masthead__util-wrapper">
          <template v-if="!isLogin && isDevelopment">
            <ui-icon-button :routerLink="'/a/goto'"
                            :icon="'xi-log-in'"
                            :text="'로그인'"
                            :class="'masthead__util'">
            </ui-icon-button>
          </template>

          <template v-if="isLogin">
            <ui-icon-button :class="'masthead__util'"
                            :icon="'xi-power-off'"
                            :text="'로그아웃'"
                            @click="logout">
            </ui-icon-button>

            <ui-icon-button :routerLink="'/admin/blog-config'"
                            :icon="'xi-cog'"
                            :text="'환경설정'"
                            :class="'masthead__util'">
            </ui-icon-button>
          </template>
        </div>

        <div class="masthead__inner">
          <div class="masthead__info">
            <router-link to="/" class="site-title">{{ $store.state.BlogConfig.data.title }}</router-link>

            <div class="masthead__author">
              <p class="masthead__author-avatar" v-if="$store.state.BlogConfig.data.avatarImgUrl">
                <ui-skeletor v-if="!dataLoaded" />
                <img v-else
                    :src=$store.state.BlogConfig.data.avatarImgUrl 
                    :alt=$store.state.BlogConfig.data.author />
              </p>

              <p class="masthead__author-name">{{ $store.state.BlogConfig.data.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-header',
  props: {
    resStatus: String,
  },
  data() {
    return {
      dataLoaded: false,
    }
  },
  watch: {
    'resStatus'() {
      // 데이타를 받아오는 동안에도 실행되므로, props값의 변경을 감지해줘야 한다.
      this.dataLoading(this.resStatus);
    },
  },
  computed: {
    backgroundContrast() {
      return this.$store.state.BlogConfig.data.ogImgContrast;
    },
    backgroundImageUrl() {
      return this.$store.state.BlogConfig.data.ogImgUrl;
    },
    backgroundImage() {
      return `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, ${this.backgroundContrast}),
        rgba(0, 0, 0, ${this.backgroundContrast})),
        url(${this.backgroundImageUrl}
      )
      `;
    },
  },
  methods: {
    /** 로그아웃 */
    async logout() {
      const confirm = await messageUtil.confirmQuestion('로그아웃하시겠습니까?');
      if (!confirm) return;

      const res = await this.$store.dispatch('Auth/LOGOUT', this.$http);

      if ('ok' === res) {
        this.$router.push('/a/goto');
      }
    },
    /** 메뉴 toggle */
    toggleMobileMenu() {
      this.$emit('toggleMobileMenu');
    },
    /** background position 가져오기 */
    backgroundPosition(xy) {
      if ('x' === xy) {
        return `${this.$store.state.BlogConfig.data.ogImgPosX}%`;
      }
      if ('y' === xy) {
        return `${this.$store.state.BlogConfig.data.ogImgPosY}%`;
      }
    },
    /** 데이타 로딩 */
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

<style lang="scss" scoped>
@import '@/assets/scss/components/header.scss';
</style>