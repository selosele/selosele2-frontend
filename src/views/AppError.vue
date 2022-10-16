<template>
  <div class="error__wrapper">
    <p class="error__message">방문을 원하시는 페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.</p>

    <div class="popular-post__list">
      <h2 class="popular-post__title">이런 글은 어떠신가요?</h2>
      <ul>
        <li class="popular-post__list__item">
          <router-link to="/post/278">
            <p class="popular-post__list__image">
              <span class="popular-post__list__no-image">s</span>
            </p>
            <p class="popular-post__list__title">
              <span>sub-pixel rendering 이슈에 대응하는 최선의 방법은 무엇인가 3</span>
            </p>
          </router-link>
        </li>
        <li class="popular-post__list__item">
          <router-link to="/post/306">
            <p class="popular-post__list__image">
              <span class="popular-post__list__no-image">레</span>
            </p>
            <p class="popular-post__list__title">
              <span>레이어팝업 닫기버튼의 논리적 순서상 위치, 어느 곳이 바람직한가?</span>
            </p>
          </router-link>
        </li>
        <li class="popular-post__list__item">
          <router-link to="/post/364">
            <p class="popular-post__list__image">
              <span class="popular-post__list__no-image">N</span>
            </p>
            <p class="popular-post__list__title">
              <span>Node.js 서버를 자동으로 재시작하는 방법</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-error',
}
</script>

<style lang="scss">
@import '@/assets/scss/views/error.scss';
@import '@/assets/scss/components/popular.scss';
</style>