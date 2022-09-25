<template>
  <div class="search__wrapper">
    <ui-form class="search__frm" @onSubmit="onSubmit">
      <div class="search__field">
        <ui-select name="t" title="검색 옵션" class="search__option" 
                   v-model="t" 
                   :data="tData"
                   :selectedValue="this.$route.query.t" />

        <ui-form-field type="search" name="q" title="포스트 검색" placeholder="검색어를 입력하세요."
                       v-model="q" />

        <button type="submit" class="search__btn">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색</span>
        </button>
      </div>

      <div class="search__detail">
        <ui-checkbox name="c" id="c"
                     label="대소문자 구분"
                     values="Y,N"
                     v-model="c"
                     :checked="(this.$route.query.c === 'Y')" />
      </div>
    </ui-form>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiFormField from '@/components/shared/form/UiFormField.vue';
import UiSelect from '@/components/shared/form/UiSelect.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'AppSearch',
  components: {
    UiForm,
    UiFormField,
    UiSelect,
    UiCheckbox,
  },
  data() {
    return {
      t: this.$route.query.t || '0',
      tData: [
        { value: '0', text: '전체' },
        { value: '1', text: '제목' },
        { value: '2', text: '내용' },
        { value: '3', text: '카테고리' },
      ],
      q: this.$route.query.q || '',
      c: this.$route.query.c || 'N',
    }
  },
  methods: {
    onSubmit() {
      if (!this.q.trim()) {
        snackbar.warning('검색어를 입력하세요.');
        return;
      }
      this.$router.push({
        path: '/search', 
        query: { q: this.q, 
                 t: this.t, 
                 c: this.c, }
      });
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
