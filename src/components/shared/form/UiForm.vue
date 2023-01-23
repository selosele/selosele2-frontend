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
import { isEmpty } from '@/utils';
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
    const form = this.$refs[this.name].$el;
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
       * vee-validate form reset 시, 초기 값이 있어도 빈 값으로 reset하는 문제에 대한 대응 로직
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
    /** Field 값 변경 */
    setFieldValue(field, value) {
      if (isEmpty(field)) return null;
      
      return this.$refs[this.name].setFieldValue(field, value);
    },
    /** Field 값 가져오기 */
    getValueByField(field) {
      if (isEmpty(field)) return null;

      return this.$refs[this.name].$el.querySelector('[name='+field+']').value;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>