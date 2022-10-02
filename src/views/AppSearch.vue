<template>
  <div class="search__wrapper">
    <ui-form class="search__frm" name="searchForm" @onSubmit="onSubmit">
      <div class="search__field">
        <ui-select name="t"
                   title="검색 옵션"
                   class="search__option" 
                   v-model="t" 
                   :data="tData"
                   :defaultValue="'검색옵션'"
                   :defaultValueDisabled="true"
                   :selectedValue="this.$route.query.t" />

        <ui-form-field type="search"
                       name="q"
                       title="포스트 검색"
                       placeholder="검색어를 입력하세요."
                       v-model="q" />

        <button type="submit" class="search__btn">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색</span>
        </button>
      </div>

      <div class="search__detail">
        <ui-checkbox name="c"
                     id="c"
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
import CodeService from '@/services/code/CodeService';

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
      t: this.$route.query.t || '',
      q: this.$route.query.q || '',
      c: this.$route.query.c || 'N',
      tData: [],
    }
  },
  async created() {
    // 검색옵션 코드 세팅
    const codeService = new CodeService();
    const searchCode = await codeService.listCode('A01');

    searchCode.forEach((item, idx) => {
      let obj = {
        value: item.val,
        text: item.nm,
      };
      this.tData.push(obj);
    });
  },
  methods: {
    onSubmit(values) {
      console.log('search values >>>', values);
      console.log('this.c >>>', this.c);

      if (!this.t.trim()) {
        snackbar.warning('검색옵션을 선택하세요.');
        return;
      }
      if (!this.q.trim()) {
        snackbar.warning('검색어를 입력하세요.');
        return;
      }

      this.$router.push({
        path: '/search', 
        query: {
          q: this.q, 
          t: this.t, 
          c: this.c,
        }
      });
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
