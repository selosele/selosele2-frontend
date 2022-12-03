<template>
  <Field type="hidden"
         :id="id"
         :ref="id"
         :name="name"
         :value="modelValue"
         v-bind="$attrs"
  >
  </Field>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-hidden-field',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    type: String,               // input type
    id: String,                 // input id
    name: String,               // input name
    modelValue: String,         // input modelValue
  },
}
</script>

<style lang="scss" scoped>

</style>