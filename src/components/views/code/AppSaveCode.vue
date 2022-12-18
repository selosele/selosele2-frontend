<template>
  <ui-split-form :name="'saveCodeForm'" @onSubmit="onSubmit">
    <ui-hidden-field :name="'originId'" :value="code.id">
    </ui-hidden-field>

    <label for="codeId">코드 ID</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'id'"
                     :id="'codeId'"
                     :rules="'required'"
                     :readonly="true"
                     v-model="id">
      </ui-text-field>
    </div>

    <label for="codePrefix">코드 접두어</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'prefix'"
                     :id="'codePrefix'"
                     :rules="'required'"
                     v-model="prefix">
      </ui-text-field>
    </div>

    <label for="codeVal">코드 값</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'val'"
                     :id="'codeVal'"
                     :rules="'required'"
                     v-model="val">
      </ui-text-field>
    </div>

    <label for="codeNm">코드 명</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'nm'"
                     :id="'codeNm'"
                     :rules="'required'"
                     :value="code.nm">
      </ui-text-field>
    </div>

    <label for="codeDesc">코드 설명</label>
    <div>
      <ui-textarea :type="'text'"
                   :name="'desc'"
                   :id="'codeDesc'"
                   :class="'resize--vertical'"
                   :rules="'required'"
                   :value="code.desc">
      </ui-textarea>
    </div>

    <div>
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
    </div>
  </ui-split-form>
</template>

<script>
import { messageUtil } from '@/utils/ui/messageUtil';
import { isBlank, isEmpty } from '@/utils/util';

export default {
  name: 'app-save-code',
  props: {
    /** 코드 정보 */
    code: Object,
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

      // 기존 ID 값이 없으면 추가 API를 타고
      if (isEmpty(values.originId)) {
        this.addCode(values);
      } else {
        // 있으면 수정 API를 탄다.
        this.updateCode(values);
      }
    },
    /** 공통코드 추가 */
    addCode(values) {
      return this.$http.post('/code', values)
        .then(res => {
          messageUtil.toastSuccess('저장되었습니다.');
          this.$emit('onSaveCode');
        });
    },
    /** 공통코드 수정 */
    updateCode(values) {
      return this.$http.put('/code', values)
        .then(res => {
          messageUtil.toastSuccess('저장되었습니다.');
          this.$emit('onSaveCode');
        });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>