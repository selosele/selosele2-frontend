<template>
  <Form ref="form"
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
      this.$emit('onSubmit', values);
    }
  }
}
</script>

<style lang="scss">

</style>