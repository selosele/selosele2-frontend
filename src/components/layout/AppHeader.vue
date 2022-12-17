<template>
  <div class="masthead__wrapper">
    <div id="masthead" class="masthead">
      <ui-button :type="'button'"
                 :class="'masthead__menu-open'">
        <i class="xi-bars" aria-hidden="true"></i>
        <span class="sr-only">메뉴</span>
      </ui-button>

      <div :class="[
        'masthead__top',
        { 'masthead--image': $store.state.BlogConfig.data.ogImgUrl }]"
          :style="[
            { backgroundImage: $store.state.BlogConfig.data.ogImgUrl && backgroundImage },
            { backgroundPositionX: $store.state.BlogConfig.data.ogImgUrl && backgroundPosition('x') },
            { backgroundPositionY: $store.state.BlogConfig.data.ogImgUrl && backgroundPosition('y') }
          ]">
        <div class="masthead__util-wrapper">
          <template v-if="!isLogin && isDevelopment">
            <ui-button :routerLink="'/a/goto'"
                       :class="'masthead__util'">
              <i class="xi-log-in" aria-hidden="true"></i>
              <span class="sr-only">로그인</span>
            </ui-button>
          </template>

          <template v-if="isLogin">
            <ui-button :type="'button'"
                       :class="'masthead__util'"
                       @click="logout">
              <i class="xi-power-off" aria-hidden="true"></i>
              <span class="sr-only">로그아웃</span>
            </ui-button>

            <ui-button :routerLink="'/admin/blog-config'"
                       :class="'masthead__util'">
              <i class="xi-cog" aria-hidden="true"></i>
              <span class="sr-only">환경설정</span>
            </ui-button>
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
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import messageUtil from '@/utils/ui/messageUtil';

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
    async logout() {
      const confirm = await messageUtil.confirmQuestion('로그아웃하시겠습니까?');
      if (!confirm) return;

      const res = await this.$store.dispatch('Auth/LOGOUT', this.$http);
      if ('ok' === res) {
        this.$router.push('/a/goto');
      }
    },
    backgroundPosition(xy) {
      if ('x' === xy) {
        return `${this.$store.state.BlogConfig.data.ogImgPosX}%`;
      }
      if ('y' === xy) {
        return `${this.$store.state.BlogConfig.data.ogImgPosY}%`;
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

<style lang="scss" scoped>
@import '@/assets/scss/components/header.scss';
</style>