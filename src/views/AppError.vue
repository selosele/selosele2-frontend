<template>
  <app-content-wrapper>
    <div class="error__wrapper">
      <div class="error__message">
        <h2 class="error__title">죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.</h2>
        <p class="error__text">페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.</p>
      </div>

      <ui-button :type="'button'"
                 :routerLink="'/'"
                 :color="'primary'">홈으로 이동
      </ui-button>
    </div>
  </app-content-wrapper>
</template>

<script>
export default {
  name: 'AppError',
  created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '404 ERROR');
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/error.scss';
</style>