<template>
  <ui-form :name="'quickSearchForm'" @onsubmit="onSubmit">
    <ui-text-field
      :type="'search'"
      :name="'q'"
      :title="'포스트 검색'"
      :placeholder="'검색어를 입력하세요.'"
      :clazz="['masthead__quick-search']"
      v-model="quickSearchQ"
    />
  </ui-form>
</template>

<script>
import { isBlank, messageUtil } from '@/utils';

export default {
  name: 'AppQuickSearch',
  data() {
    return {
      quickSearchQ: '',
    }
  },
  watch: {
    '$route'() {
      // 페이지 전환 시, 퀵검색 필드 값 초기화
      this.quickSearchQ = '';
    }
  },
  methods: {
    /** 포스트 검색 submit */
    async onSubmit(values) {
      const isValid = this.validationCheck();
      if (!isValid) return;
      
      await this.$store.dispatch('Search/GO_SEARCH', {
        q: values.q,
        t: '001',
        c: 'N',
        page: 1,
        pageSize: 10
      });
    },
    /** 유효성 검사 */
    validationCheck() {
      if (isBlank(this.quickSearchQ)) {
        messageUtil.toastWarning('검색어를 입력하세요.');
        return false;
      }
      return true;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>