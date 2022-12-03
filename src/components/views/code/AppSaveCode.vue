<template>
  <ui-split-form :name="'saveCodeForm'" @onSubmit="onSubmit">
    <label for="codeId">코드 ID</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'id'"
                     :id="'codeId'"
                     :rules="'required'"
                     :value="code.id"
                     :readonly="true">
      </ui-text-field>
    </div>

    <label for="codePrefix">코드 접두어</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'prefix'"
                     :id="'codePrefix'"
                     :rules="'required'"
                     :value="code.prefix">
      </ui-text-field>
    </div>

    <label for="codeVal">코드 값</label>
    <div>
      <ui-text-field :type="'text'"
                     :name="'val'"
                     :id="'codeVal'"
                     :rules="'required'"
                     :value="code.val">
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
import UiSplitForm from '@/components/shared/form/UiSplitForm.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import UiRadio from '@/components/shared/form/UiRadio.vue';
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import messageUtil from '@/utils/ui/MessageUtil';

export default {
  name: 'app-save-code',
  props: {
    // 코드 정보
    code: Object,
  },
  components: {
    UiSplitForm,
    UiTextField,
    UiTextarea,
    UiSkeletor,
    UiRadio,
  },
  data() {
    return {
      useYn: '',
    }
  },
  created() {
    this.useYn = this.code.useYn;
  },
  methods: {
    async onSubmit(values) {
      console.log('수정', values);

      const confirm = await messageUtil.confirmSuccess('코드를 수정하시겠습니까?');
      if (!confirm) return;

      this.$http.put(`/code/${values.id}`, values)
        .then(res => {
          messageUtil.toastSuccess('수정되었습니다.');
        });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>