<template>
  <ui-split-form
    :name="'saveCategoryForm'"
    :btnRemove="true"
    @onsubmit="onSubmit"
    @remove="onRemove"
  >
    <ui-hidden-field :name="'id'" :value="category.id" />
    <ui-hidden-field :name="'type'" :value="type" />

    <ui-text-field
      :name="'nm'"
      :id="'categoryNm'"
      :label="`${text} 명`"
      :rules="'required|max:50'"
      :block="true"
      :value="category.nm"
    />

    <ui-text-field
      :name="'desc'"
      :id="'categoryDesc'"
      :label="`${text} 설명`"
      :rules="'max:100'"
      :block="true"
      :value="category.desc"
    />

    <ui-text-field
      :name="'regDate'"
      :id="'categoryRegDate'"
      :label="`${text} 등록일시`"
      :readonly="true"
      :block="true"
      :value="category.regDate"
    />
  </ui-split-form>
</template>

<script>
import { messageUtil, isEmpty } from '@/utils';

export default {
  name: 'AppSaveCategory',
  props: {
    /** 카테고리/태그 정보 */
    category: Object,
    /** type: D01004(카테고리), D01005(태그) */
    type: String,
  },
  data() {
    return {
      /** 카테고리/태그 구분 텍스트 */
      text: '',
    }
  },
  created() {
    if ('D01004' === this.type) {
      this.text = '카테고리';
    } else if ('D01005' === this.type) {
      this.text = '태그';
    }
  },
  methods: {
    /** 카테고리 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      // 카테고리 ID 값이 없으면 등록 API를 타고
      if (isEmpty(values.id)) {
        await this.addCategory(values);
      } else {
        // 있으면 수정 API를 탄다.
        await this.updateCategory(values);
      }
    },
    /** 카테고리 삭제 */
    async onRemove(values) {
      if (isEmpty(values.id)) return;

      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`${this.getApiUri(values)}/${values.id}`)
      .then(resp => {
        messageUtil.toastSuccess('삭제되었습니다.');
        this.$emit('refreshCategory');
      });
    },
    /** 카테고리 등록 */
    addCategory(values) {
      return this.$http.post(this.getApiUri(values), values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('refreshCategory');
      });
    },
    /** 카테고리 수정 */
    updateCategory(values) {
      return this.$http.put(this.getApiUri(values), values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('refreshCategory');
      });
    },
    /** 페이지 유형에 따른 API 호출 URI 반환 */
    getApiUri(values) {
      if ('D01004' === values.type) return '/category';
      if ('D01005' === values.type) return '/tag';
      return '';
    },
  }
}
</script>

<style lang="scss" scoped>

</style>