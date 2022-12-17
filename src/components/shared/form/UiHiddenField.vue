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
    /** input type */
    type: String,
    /** input id */
    id: String,
    /** input name */
    name: String,
    /** input modelValue */
    modelValue: String,
  },
}
</script>

<style lang="scss" scoped>

</style>