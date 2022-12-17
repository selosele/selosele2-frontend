<template>
  <header :class="[
    'page__header',
    $route.meta.pageType !== 'home' ? '' : 'sr-only'
    ]">
    <h1 class="page__title">
      {{ $route.meta.pageType !== 'home' ? pageTitle : '최근 포스트' }}
    </h1>
  </header>

  <slot></slot>
</template>

<script>
export default {
  name: 'app-content-wrapper',
  props: {
    /** 페이지 타이틀 */
    pageTitle: String,
  },
}
</script>

<style lang="scss" scoped>

</style>