<template>
  <Form :name="name"
        :ref="name"
        :autocomplete="autocomplete"
        @submit="onSubmit"
        @reset="$emit('onReset')"
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
  props: {
    name: String,         // form name
    autocomplete: String  // form autocomplete
  },
  components: {
    Form,
  },
  methods: {
    onSubmit(values) {
      this.$emit('onSubmit', values);
    },
    // 모든 Field에 대한 유효성 검증
    validateAll() {
      return this.$refs[this.name].validate();
    },
    // 1개 Field에 대한 유효성 검증
    validateField(field) {
      return this.$refs[this.name].validateField(field);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>