<template>
  <Field type="hidden"
         :id="id"
         :ref="id"
         :name="name"
         :value="value"
         v-bind="$attrs"
  >
  </Field>
</template>

<script>
import { Field } from 'vee-validate';

export default {
  name: 'UiHiddenField',
  components: {
    Field,
  },
  props: {
    /** input type */
    type: String,
    /** input id */
    id: String,
    /** input name */
    name: String,
    /** input value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** input modelValue */
    modelValue: {
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>

</style>