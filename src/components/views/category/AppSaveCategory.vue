<template>
  <ui-split-form :name="'saveCategoryForm'"
                 :btnRemove="true"
                 @onSubmit="onSubmit"
                 @onRemove="onRemove"
  >
    <ui-hidden-field :name="'id'" :value="category.id">
    </ui-hidden-field>

    <ui-hidden-field :name="'type'" :value="type">
    </ui-hidden-field>

    <label for="codeId">카테고리 명</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'nm'"
                     :id="'categoryNm'"
                     :rules="'required'"
                     :value="category.nm">
      </ui-text-field>
    </div>

    <label for="codeId">카테고리 등록일시</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'regDate'"
                     :id="'categoryRegDate'"
                     :readonly="true"
                     :value="category.regDate">
      </ui-text-field>
    </div>
  </ui-split-form>
</template>

<script>
import { messageUtil } from '@/utils/ui/messageUtil';
import { isEmpty } from '@/utils/util';

export default {
  name: 'app-save-category',
  props: {
    /** 카테고리 정보 */
    category: Object,
    /** type: category(카테고리 타입), tag(태그 타입) */
    type: String,
  },
  methods: {
    /** 카테고리 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      // 카테고리 ID 값이 없으면 추가 API를 타고
      if (isEmpty(values.id)) {
        this.addCategory(values);
      } else {
        // 있으면 수정 API를 탄다.
        this.updateCategory(values);
      }
    },
    /** 카테고리 삭제 */
    async onRemove(values) {
      if (isEmpty(values.id)) return;

      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`/${values.type}/${values.id}`)
        .then(res => {
          messageUtil.toastSuccess('삭제되었습니다.');
          this.$emit('refreshCategory');
        });
    },
    /** 카테고리 추가 */
    addCategory(values) {
      return this.$http.post(`/${values.type}`, values)
        .then(res => {
          messageUtil.toastSuccess('저장되었습니다.');
          this.$emit('refreshCategory');
        });
    },
    /** 카테고리 수정 */
    updateCategory(values) {
      return this.$http.put(`/${values.type}`, values)
        .then(res => {
          messageUtil.toastSuccess('저장되었습니다.');
          this.$emit('refreshCategory');
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>