<template>
  <ui-split-form :name="'saveCodeForm'" :btnSave="false">
    <ui-hidden-field :name="'originId'" :value="code.id" />

    <ui-text-field
      :name="'id'"
      :id="'codeId'"
      :label="'코드 ID'"
      :rules="'required|max:6'"
      :disabled="true"
      :block="true"
      v-model="id"
    />

    <ui-text-field
      :name="'prefix'"
      :id="'codePrefix'"
      :label="'코드 접두어'"
      :rules="'required|max:3'"
      :disabled="true"
      :block="true"
      v-model="prefix"
    />

    <ui-text-field
      :name="'val'"
      :id="'codeVal'"
      :label="'코드 값'"
      :rules="'required|max:3'"
      :disabled="true"
      :block="true"
      v-model="val"
    />

    <ui-text-field
      :name="'nm'"
      :id="'codeNm'"
      :label="'코드 명'"
      :rules="'required|max:30'"
      :disabled="true"
      :block="true"
      :value="code.nm"
    />

    <ui-textarea
      :name="'desc'"
      :id="'codeDesc'"
      :resize="'vertical'"
      :label="'코드 설명'"
      :rules="'required|max:30'"
      :disabled="true"
      :value="code.desc"
    />

    <ui-radio-group :label="'코드 사용 여부'">
      <ui-radio
        :id="'codeUseYn1'"
        :name="'useYn'"
        :label="'사용'"
        :value="'Y'"
        :rules="'required'"
        :disabled="true"
        v-model="useYn"
      />
      <ui-radio
        :id="'codeUseYn2'"
        :name="'useYn'"
        :label="'미사용'"
        :value="'N'"
        :rules="'required'"
        :disabled="true"
        v-model="useYn"
      />
    </ui-radio-group>
  </ui-split-form>
</template>

<script>
import { isBlank } from '@/utils';

export default {
  name: 'AppSaveCode',
  props: {
    /** 코드 정보 */
    code: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      id: '',
      prefix: '',
      val: '',
      useYn: '',
    }
  },
  created() {
    this.prefix = this.code.prefix;
    this.val = this.code.val;
    this.id = (this.prefix || '') + (this.val || '');
    this.useYn = this.code.useYn;
  },
  watch: {
    prefix(val, oldVal) {
      if (isBlank(val) || isBlank(this.val)) {
        this.id = '';
        return;
      }
      this.id = val + this.val;
    },
    val(val, oldVal) {
      if (isBlank(val) || isBlank(this.prefix)) {
        this.id = '';
        return;
      }
      this.id = this.prefix + val;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>