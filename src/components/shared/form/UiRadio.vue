<template>
  <Field type="radio"
         :name="name"
         :id="id"
         :ref="id"
         :title="title"
         :rules="rules"
         :value="value"
         v-model="mv">
  </Field>

  <label v-if="label" :for="id">{{ label }}</label>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-radio',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** radio id */
    id: String,
    /** radio name */
    name: String,
    /** radio title */
    title: String,
    /** radio label */
    label: String,
    /** radio validation rules */
    rules: String,
    /** radio value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** radio modelValue */
    modelValue: {
      default: '',
    }
  },
  computed: {
    mv: {
      get() {
        return this.modelValue;
      },
      set(v) {}
    }
  },
}
</script>

<style lang="scss" scoped>

</style>