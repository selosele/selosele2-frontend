<template>
  <Form :name="name"
        @submit="onSubmit"
        @reset="$emit('onReset')">
    <slot />
  </Form>
</template>

<script>
import { Form } from 'vee-validate';

export default {
  name: 'UiForm',
  components: {
    Form,
  },
  methods: {
    onSubmit(values) {
      const formValues = this.getFormValues();
      this.$emit('onSubmit', formValues);
    },
    // Form Values -> JSON으로 가공
    getFormValues() {
      if (this.name === undefined || this.name === null) {
        throw new Error('Form name 속성값이 누락되었습니다.');
      }

      const form = document.getElementsByName(this.name);

      if (form.length > 1) {
        throw new Error('Form name 속성값이 중복되었습니다.');
      }
      
      const data = new FormData(form[0]);
      let obj = {};

      data.forEach((value, key) => obj[key] = value);
      
      return obj;
    },
  },
  props: {
    name: String  // form name
  },
}
</script>

<style lang="scss">

</style>