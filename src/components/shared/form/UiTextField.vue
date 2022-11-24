<template>
  <Field :type="type"
         :id="id"
         :ref="id"
         :name="name"
         :title="title"
         :placeholder="placeholder"
         :rules="rules"
         :value="modelValue"
         v-bind="$attrs"
         @input="$emit('update:modelValue', $event.target.value)"
  >
  </Field>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-text-field',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    type: String,               // input type
    id: String,                 // input id
    name: String,               // input name
    title: String,              // input title
    placeholder: String,        // input placeholder
    rules: String,              // input validation rules
    modelValue: String,         // input modelValue
  },
  methods: {
    focus() {
      this.$refs[this.id].$el.focus();
    }
  },
}
</script>

<style lang="scss" scoped>

</style>