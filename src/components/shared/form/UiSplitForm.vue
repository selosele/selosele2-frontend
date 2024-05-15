<template>
  <ui-form
    :name="name"
    :ref="name"
    :autocomplete="autocomplete"
    v-slot="{ validateAll, validateField }"
  >
    <slot
      :validateAll="validateAll"
      :validateField="validateField"
    />

    <div class="d-flex gap--10 mt--15">
      <ui-button
        :type="'submit'"
        :color="'primary'"
        :text="'저장'"
        v-if="btnSave"
      />

      <ui-button
        :color="'dark'"
        :text="'삭제'"
        @click="onRemove"
        v-if="btnRemove"
      />

      <ui-button
        :color="'secondary'"
        :text="'닫기'"
        @click="onClose"
      />
    </div>
  </ui-form>
</template>

<script>
import { getFormValues } from '@/utils';
import UiForm from './UiForm.vue';

export default {
  name: 'UiSplitForm',
  extends: UiForm,
  props: {
    /** form name */
    name: String,
    /** form autocomplete */
    autocomplete: String,
    /** 저장 버튼 사용 여부 */
    btnSave: {
      type: Boolean,
      default: true,
    },
    /** 삭제 버튼 사용 여부 */
    btnRemove: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /** 닫기 */
    onClose() {
      this.$store.commit('Splitter/TOGGLE', false);
      this.$emit('close');
    },
    /** 삭제 */
    onRemove() {
      this.$emit('remove', getFormValues(this.$refs[this.name].$el));
    }
  },
}
</script>

<style lang="scss" scoped>

</style>