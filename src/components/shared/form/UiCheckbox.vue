<template>
  <Field type="checkbox"
         :name="name"
         :id="id"
         :ref="id"
         :title="title"
         :rules="rules"
         :value="getValueByIdx(0)"
         :unchecked-value="getValueByIdx(1)"
         v-model="mv">
  </Field>

  <label v-if="label" :for="id">
    <span class="sr-only" v-if="labelHidden">{{ label }}</span>
    <template v-else>{{ label }}</template>
  </label>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-checkbox',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    id: String,                     // checkbox id
    name: String,                   // checkbox name
    title: String,                  // checkbox title
    checked: Boolean,               // checkbox checked
    label: String,                  // checkbox label
    labelHidden: Boolean,           // checkbox label hidden
    rules: String,                  // checkbox validation rules
    modelValue: {                   // checkbox modelValue
      default: '',
    },
    value: {                        // checkbox true value
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    values: String,                 // checkbox true value & false value
  },
  data() {
    return {
      mv: this.modelValue,
    }
  },
  methods: {
    onChange(e) {
      console.log('modelValue >>>', this.modelValue);
      this.$emit('update:modelValue', this.getValue(e));
    },
    getValue(e) {
      if (e.target.checked) {
        return this.values.split(',')[0];
      }
      return this.values.split(',')[1];
    },
    getValueByIdx(i) {
      return this.values.split(',')[i];
    },
  },
}
</script>

<style lang="scss" scoped>

</style>