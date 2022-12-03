<template>
  <Form :name="name"
        :autocomplete="autocomplete"
        @submit="onSubmit"
        @reset="$emit('onReset')"
  >
    <slot></slot>
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
  },
}
</script>

<style lang="scss" scoped>

</style>