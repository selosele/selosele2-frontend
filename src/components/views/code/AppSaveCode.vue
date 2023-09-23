<template>
  <ui-split-form :name="'saveCodeForm'" @onsubmit="onSubmit">
    <ui-hidden-field :name="'originId'" :value="code.id" />

    <ui-text-field :type="'text'"
                   :name="'id'"
                   :id="'codeId'"
                   :label="'코드 ID'"
                   :rules="'required|max:6'"
                   :readonly="true"
                   :block="true"
                   v-model="id">
    </ui-text-field>

    <ui-text-field :type="'text'"
                   :name="'prefix'"
                   :id="'codePrefix'"
                   :label="'코드 접두어'"
                   :rules="'required|max:3'"
                   :block="true"
                   v-model="prefix">
    </ui-text-field>

    <ui-text-field :type="'text'"
                   :name="'val'"
                   :id="'codeVal'"
                   :label="'코드 값'"
                   :rules="'required|max:3'"
                   :block="true"
                   v-model="val">
    </ui-text-field>

    <ui-text-field :type="'text'"
                   :name="'nm'"
                   :id="'codeNm'"
                   :label="'코드 명'"
                   :rules="'required|max:30'"
                   :block="true"
                   :value="code.nm">
    </ui-text-field>

    <ui-textarea :type="'text'"
                 :name="'desc'"
                 :id="'codeDesc'"
                 :resize="'vertical'"
                 :label="'코드 설명'"
                 :rules="'required|max:30'"
                 :value="code.desc">
    </ui-textarea>

    <ui-radio-group :label="'코드 사용 여부'">
      <ui-radio :id="'codeUseYn1'"
                :name="'useYn'"
                :label="'사용'"
                :value="'Y'"
                :rules="'required'"
                v-model="useYn">
      </ui-radio>
      <ui-radio :id="'codeUseYn2'"
                :name="'useYn'"
                :label="'미사용'"
                :value="'N'"
                :rules="'required'"
                v-model="useYn">
      </ui-radio>
    </ui-radio-group>
  </ui-split-form>
</template>

<script>
import { isBlank, isEmpty, messageUtil } from '@/utils';

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
  methods: {
    /** 공통코드 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      // 기존 ID 값이 없으면 등록 API를 타고
      if (isEmpty(values.originId)) {
        this.addCode(values);
      } else {
        // 있으면 수정 API를 탄다.
        this.updateCode(values);
      }
    },
    /** 공통코드 등록 */
    addCode(values) {
      return this.$http.post('/code', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('saveCode');
      });
    },
    /** 공통코드 수정 */
    updateCode(values) {
      return this.$http.put('/code', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('saveCode');
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>