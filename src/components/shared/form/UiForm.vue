<template>
  <Form :name="name"
        :ref="name"
        :id="name"
        :autocomplete="autocomplete"
        @submit="onSubmit"
        @reset="onReset"
  >
    <slot :validateAll="validateAll"
          :validateField="validateField">
    </slot>
  </Form>
</template>

<script>
import { Form } from 'vee-validate';

export default {
  name: 'ui-form',
  components: {
    Form,
  },
  props: {
    /** form name */
    name: String,
    /** form autocomplete */
    autocomplete: String
  },
  data() {
    return {
      /** form field 초기 값 */
      formOldValues: null,
    }
  },
  mounted() {
    const form = document.getElementById(this.name);
    this.formOldValues = Object.fromEntries(new FormData(form));
  },
  methods: {
    /** form 제출 시 */
    onSubmit(values) {
      this.$emit('onsubmit', values);
    },
    /** form reset 시 */
    onReset() {
      /**
       * 2023.01.14.
       * vee-validate form reset 시, 초기 값이 있어도 빈 값으로 reset하는 문제 대응 로직 작업
       *   - 빈 값 대신 form의 초기 값으로 치환하는 로직임.
       */
      for (let i = 0; i < Object.keys(this.formOldValues).length; i++) {
        const key = Object.keys(this.formOldValues)[i];

        this.$refs[this.name].setFieldValue(key, this.formOldValues[key]);
      }

      this.$emit('onreset');
    },
    /** 모든 Field에 대한 유효성 검증 */
    validateAll() {
      return this.$refs[this.name].validate();
    },
    /** 1개 Field에 대한 유효성 검증 */
    validateField(field) {
      return this.$refs[this.name].validateField(field);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>