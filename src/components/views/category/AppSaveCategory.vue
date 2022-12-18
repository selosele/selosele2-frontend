<template>
  <ui-split-form :name="'saveCodeForm'"
                 @onSubmit="onSubmit"
                 @onRemove="onRemove"
                 :btnRemove="true">

    <ui-hidden-field :name="'id'" :value="category.id">
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
                     :value="category.regDate">
      </ui-text-field>
    </div>
  </ui-split-form>
</template>

<script>
import { messageUtil } from '@/utils/ui/messageUtil';

export default {
  name: 'app-save-category',
  props: {
    /** 카테고리 정보 */
    category: Object,
  },
  methods: {
    /** 카테고리 저장 */
    async onSubmit(values) {
      console.log(values);
      
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;
    },
    /** 카테고리 삭제 */
    async onRemove() {
      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>