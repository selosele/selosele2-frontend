<template>
  <div class="masthead__wrapper">
    <div id="masthead" class="masthead">
      <ui-button :type="'button'"
                :className="'masthead__menu-open'">
        <i class="xi-bars" aria-hidden="true"></i>
        <span class="sr-only">메뉴</span>
      </ui-button>

      <div :class="[
        'masthead__top',
        { 'masthead--image': this.$store.state.blogConfig.ogImgUrl }]"
          :style="[
            { backgroundImage: this.$store.state.blogConfig.ogImgUrl && backgroundImage },
            { backgroundPositionX: this.$store.state.blogConfig.ogImgUrl && backgroundPosition('x') },
            { backgroundPositionY: this.$store.state.blogConfig.ogImgUrl && backgroundPosition('y') }
          ]">
        <div class="masthead__util-wrapper">
          <template v-if="!isLogin && isDevelopment">
            <ui-button :routerLink="'/a/goto'"
                      :className="'masthead__util'">
              <i class="xi-log-in" aria-hidden="true"></i>
              <span class="sr-only">로그인</span>
            </ui-button>
          </template>

          <template v-if="isLogin">
            <ui-button :type="'button'"
                       :className="'masthead__util'"
                       @click="logout">
              <i class="xi-power-off" aria-hidden="true"></i>
              <span class="sr-only">로그아웃</span>
            </ui-button>

            <ui-button :routerLink="'/admin/blog-config'"
                       :className="'masthead__util'">
              <i class="xi-cog" aria-hidden="true"></i>
              <span class="sr-only">환경설정</span>
            </ui-button>
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
  computed: {
    backgroundContrast() {
      return this.$store.state.blogConfig.ogImgContrast;
    },
    backgroundImageUrl() {
      return this.$store.state.blogConfig.ogImgUrl;
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

      const res = await this.$store.dispatch('LOGOUT', this.$http);
      if ('ok' === res) {
        this.$router.push('/a/goto');
      }
    },
    backgroundPosition(xy) {
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

<style lang="scss" scoped>
@import '@/assets/scss/components/header.scss';
</style>