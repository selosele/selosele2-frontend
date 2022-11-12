<template>
  <nav id="gnb" class="gnb">
    <ul class="gnb__list">
      <li class="gnb__list__item">
        <router-link to="/content/about">내소개</router-link>
      </li>
      <li class="gnb__list__item">
        <router-link to="/year">연도별 모아보기</router-link>
      </li>
      <li class="gnb__list__item">
        <router-link to="/guestbook">방명록</router-link>
      </li>
      <li class="gnb__list__item">
        <router-link to="/search">검색</router-link>
      </li>
      <li :class="[
          'gnb__list__item',
          'gnb__list__item--has-child',
          { 'gnb__list__item--active': isShow }
        ]">
        <router-link to="/admin/blogconfig" custom v-slot="{ href, isActive }">
          <a :href="href"
             :active="isActive"
             :class="{ 'router-link-active': isActive }"
             @click.prevent="toggleMenu"
             ref="menuLink">블로그 관리</a>
        </router-link>

        <transition name="fade">
          <ul class="gnb__list--depth2" v-show="isShow">
            <li class="gnb__list--depth2__list">
              <router-link to="/admin/blogconfig">블로그 환경설정</router-link>
              <router-link to="/admin/code">공통코드 관리</router-link>
              <router-link to="/admin/menu">메뉴 관리</router-link>
              <router-link to="/admin/post-reply">포스트 댓글 관리</router-link>
              <router-link to="/admin/content">콘텐츠 페이지 관리</router-link>
              <router-link to="/admin/satisfaction">만족도조사 관리</router-link>
              <router-link to="/admin/upload">이미지 업로드</router-link>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'app-menu',
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu);
  },
  unmounted() {
    document.removeEventListener('click', this.closeMenu);
  },
  methods: {
    // 메뉴 Toggle
    toggleMenu() {
      this.isShow = !this.isShow;
    },
    // 메뉴 닫기
    closeMenu(e) {
      if (!this.$refs.menuLink.contains(e.target)) {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/menu.scss';
</style>