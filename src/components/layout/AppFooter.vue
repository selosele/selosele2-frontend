<template>
  <footer id="footer" class="footer">
    <div class="footer__inner">
      <p>
        &copy; 2022 {{ this.$store.state.blogConfig.author }}.
        <router-link to="" class="link">개인정보 수집 및 이용 안내</router-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/footer.scss';
</style>