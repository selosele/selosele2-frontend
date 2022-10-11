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
          (isShow && 'gnb__list__item--active')
        ]">
        <a href="#none" @click.prevent="toggleMenu">시스템관리</a>
        <transition name="fade">
          <ul class="gnb__list--depth2" v-show="isShow">
            <li class="gnb__list--depth2__list">
              <router-link to="/blogconfig">블로그 환경설정</router-link>
              <router-link to="/menu">메뉴 관리</router-link>
              <router-link to="/post-reply">포스트 댓글 관리</router-link>
              <router-link to="/content">콘텐츠 페이지 관리</router-link>
              <router-link to="/satisfaction">페이지 만족도조사 정보</router-link>
              <router-link to="/upload">이미지 업로드</router-link>
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
  watch: {
    $route(to, from) {
      // 페이지 전환 시 2차메뉴 닫히게 하기
      this.isShow = false;
    }
  },
  methods: {
    // 메뉴 Toggle
    toggleMenu() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/menu.scss';
</style>