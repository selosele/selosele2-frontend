<template>
  <footer id="footer" class="footer">
    <div class="footer__inner">
      <p>&copy; 2022 {{ $store.state.BlogConfig.data?.author }}.
        <router-link to="/content/policy" class="link">개인정보 수집 및 이용 안내</router-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/footer.scss';
</style>