<template>
  <nav class="pagination">
    <ul>
      <li class="pagination__list pagination__list--num pagination__list--active">
        <router-link to="">1</router-link>
      </li>

      <li class="pagination__list pagination__list--num">
        <router-link to="">2</router-link>
      </li>

      <li class="pagination__list pagination__list--num pagination__list--total">
        <router-link to="">3</router-link>
      </li>

      <li class="pagination__list pagination__list--next">
        <router-link to="">
          <i class="xi-angle-right" aria-hidden="true"></i>
          <span class="sr-only">다음 페이지</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ui-pagination',
};
</script>

<style lang="scss"></style>
