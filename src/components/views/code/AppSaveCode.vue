<template>
  <ui-form :name="'saveCodeForm'" @onSubmit="onSubmit">
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

    <ui-button :type="'submit'"
               :color="'primary'"
               :class="'mt--15'">수정
    </ui-button>
  </ui-form>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
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
    UiForm,
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

      // const confirm = await messageUtil.confirmSuccess('코드를 수정하시겠습니까?');
      // if (!confirm) return;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>