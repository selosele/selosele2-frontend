<template>
  <div class="masthead__wrapper">
    <div id="masthead" class="masthead">
      <ui-icon-button
        ref="btnMenu"
        :icon="'xi-bars'"
        :text="'메뉴'"
        :class="'masthead__menu-open'"
        @click="toggleMobileMenu"
      />

      <div :class="clazz" :style="styles">
        <div class="masthead__util-wrapper">
          <template v-if="!isAdmin">
            <ui-icon-button
              :routerLink="'/login'"
              :icon="'xi-log-in'"
              :text="'로그인'"
              :class="'masthead__util'"
            />
          </template>

          <template v-if="isAdmin">
            <ui-icon-button
              :icon="'xi-power-off'"
              :text="'로그아웃'"
              :class="'masthead__util'"
              @click="logout"
            />

            <ui-icon-button
              :routerLink="'/admin/blog-config'"
              :icon="'xi-cog'"
              :text="'환경설정'"
              :class="'masthead__util'"
            />

            <ui-icon-button
              :icon="'xi-message'"
              :text="'알림 확인'"
              :class="'masthead__util masthead__util--notice'"
              ref="notiBtn"
              @click.stop="toggleNotiLayer"
            >

              <span class="masthead__util--notice-count" v-if="0 < $store.state.Notification.notiCnt">
                {{ 10 <= $store.state.Notification.notiCnt ? '9+' : $store.state.Notification.notiCnt }}
              </span>
            </ui-icon-button>

            <app-notification
              ref="notiLayer"
              :key="$store.state.Notification.notiList"
              :list="$store.state.Notification.notiList"
              @check="onCheckNotification"
              v-if="notiToggle"
            />
          </template>
        </div>

        <div class="masthead__inner">
          <div class="masthead__info">
            <router-link to="/" class="site-title">
              {{ $store.state.BlogConfig.data?.title }}
            </router-link>

            <div class="masthead__author">
              <p class="masthead__author-avatar" v-if="$store.state.BlogConfig.data?.avatarImgUrl">
                <ui-skeletor v-if="!dataLoaded" />
                <img v-else
                    :src=$store.state.BlogConfig.data?.avatarImgUrl 
                    :alt=$store.state.BlogConfig.data?.author />
              </p>

              <p class="masthead__author-name">
                {{ $store.state.BlogConfig.data?.author }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isBlank, isNotEmpty, messageUtil } from '@/utils';
import AppNotification from '@/components/layout/AppNotification.vue';

export default {
  name: 'AppHeader',
  components: {
    AppNotification,
  },
  props: {
    resStatus: String,
  },
  data() {
    return {
      notiToggle: false,
      dataLoaded: false,
    }
  },
  async created() {
    // TODO: 2023.10.07. $store.getters.isAdmin(this.isAdmin)을 접근하면 관리자 권한이 있어도 false 반환
    // 임시로 관리자 권한 검증 로직을 실행하는 것으로 처리
    // 추후 리팩토링
    const isAdmin = await this.$store.dispatch('Auth/HAS_ROLE', 'ROLE_ADMIN');
    if (isAdmin) {
      this.listNotification();
    }
  },
  mounted() {
    document.addEventListener('click', this.closeNotiLayer);
  },
  unmounted() {
    document.removeEventListener('click', this.closeNotiLayer);
  },
  watch: {
    'resStatus'() {
      // 데이타를 받아오는 동안에도 실행되므로, props값의 변경을 감지해줘야 한다.
      this.dataLoading(this.rs);
    },
    '$route'() {
      this.notiToggle = false;
    },
  },
  computed: {
    rs: {
      get() {
        return this.resStatus;
      },
      set(v) {}
    },
    clazz: {
      get() {
        return [
          'masthead__top',
          { 'masthead--image': this.$store.state.BlogConfig.data?.ogImgUrl }
        ];
      },
      set(v) {}
    },
    styles: {
      get() {
        return [
          { backgroundImage: this.backgroundImage },
          { backgroundPositionX: this.backgroundPositionX },
          { backgroundPositionY: this.backgroundPositionY },
          { backgroundSize: this.backgroundSize },
          { '--data-blur': this.backgroundBlur },
        ];
      },
      set(v) {}
    },
    backgroundBlur() {
      return (this.$store.state.BlogConfig.data?.ogImgBlur / 20) + 'rem';
    },
    backgroundContrast() {
      return this.$store.state.BlogConfig.data?.ogImgContrast;
    },
    backgroundImageUrl() {
      return this.$store.state.BlogConfig.data?.ogImgUrl;
    },
    backgroundImage() {
      if (isBlank(this.$store.state.BlogConfig.data?.ogImgUrl)) {
        return '';
      }

      return `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, ${this.backgroundContrast}),
        rgba(0, 0, 0, ${this.backgroundContrast})),
        url(${this.backgroundImageUrl}
      )
      `;
    },
    backgroundPositionX() {
      if (isBlank(this.$store.state.BlogConfig.data?.ogImgUrl)) {
        return 0;
      }
      return `${this.$store.state.BlogConfig.data?.ogImgPosX}%`;
    },
    backgroundPositionY() {
      if (isBlank(this.$store.state.BlogConfig.data?.ogImgUrl)) {
        return 0;
      }
      return `${this.$store.state.BlogConfig.data?.ogImgPosY}%`;
    },
    backgroundSize() {
      if ('Y' === this.$store.state.BlogConfig.data?.ogImgCoverYn) {
        return 'cover';
      }
      return 'contain';
    }
  },
  methods: {
    /** 로그아웃 */
    async logout() {
      const confirm = await messageUtil.confirmQuestion('로그아웃하시겠습니까?');
      if (!confirm) return;

      const res = await this.$store.dispatch('Auth/LOGOUT');

      if ('ok' === res) {
        this.$router.push('/login');
      }
    },
    /** 메뉴 toggle */
    toggleMobileMenu() {
      this.$emit('toggleMobileMenu');
    },
    /** 알림 레이어 toggle */
    toggleNotiLayer() {
      this.notiToggle = !this.notiToggle;
    },
    /** 알림 레이어 닫기 */
    closeNotiLayer(e) {
      if (isNotEmpty(this.$refs['notiLayer']) && e.target !== this.$refs['notiLayer']
                                              && e.target !== this.$refs['notiBtn']) {
        this.notiToggle = false;
      }
    },
    /** 알림 목록 조회 */
    listNotification() {
      this.$store.dispatch('Notification/LIST_NOTIFICATION');
    },
    /** 알림 확인 여부 값 수정 시 */
    onCheckNotification() {
      this.listNotification();
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