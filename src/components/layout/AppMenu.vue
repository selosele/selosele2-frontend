<template>
  <nav id="gnb" class="gnb">
    <ul class="gnb__list">
      <li class="gnb__list__item">
        <router-link to="">내소개</router-link>
      </li>
      <li class="gnb__list__item">
        <router-link to="/year">연도별 모아보기</router-link>
      </li>
      <li class="gnb__list__item">
        <router-link to="/guestbook">방명록</router-link>
      </li>
      <li class="gnb__list__item gnb__list__item--has-child">
        <router-link to="/search">검색</router-link>
        <ul class="gnb__list--depth2">
          <li class="gnb__list--depth2__list">
            <router-link to="">테스트1</router-link>
            <router-link to="">테스트2</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'app-menu',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/menu.scss';
</style>