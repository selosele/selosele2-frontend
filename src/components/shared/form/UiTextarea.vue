<template>
  <Field as="textarea"
         :id="id"
         :ref="id"
         :name="name"
         :title="title"
         :class="className"
         :placeholder="placeholder"
         :cols="cols"
         :rows="rows"
         :rules="rules"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
  >
  </Field>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-textarea',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    id: String,                 // textarea id
    name: String,               // textarea name
    title: String,              // textarea title
    className: String,          // textarea class
    placeholder: String,        // textarea placeholder
    cols: String,               // textarea cols
    rows: String,               // textarea rows
    rules: String,              // textarea validation rules
    modelValue: String,         // textarea modelValue
  },
}
</script>

<style lang="scss">

</style>