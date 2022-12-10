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
    id: String,                     // radio id
    name: String,                   // radio name
    title: String,                  // radio title
    label: String,                  // radio label
    rules: String,                  // radio validation rules
    value: {                        // radio value
      type: [String, Number],
      default: undefined,
    },        
    modelValue: {                   // radio modelValue
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