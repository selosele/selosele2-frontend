<template>
  <header :class="[
    'page__header',
    $route.meta.pageType !== 'D01001' ? '' : 'sr-only'
    ]">
    <h1 class="page__title">
      {{ $route.meta.pageType !== 'D01001' ? $store.state.Breadcrumb.pageTitle : '최근 포스트' }}
    </h1>
  </header>

  <slot />
</template>

<script>
export default {
  name: 'AppContentWrapper',
}
</script>

<style lang="scss" scoped>

</style>