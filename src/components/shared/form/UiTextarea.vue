<template>
  <Field as="textarea"
         :id="id"
         :name="name"
         :title="title"
         :class="className"
         :placeholder="placeholder"
         :cols="cols"
         :rows="rows"
         :rules="rules"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)" />

  <ErrorMessage v-if="showMsg !== false || showMsg"
                class="form-field-error"
                :name="name" />
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'UiTextarea',
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
    showMsg: Boolean,           // textarea validation 에러메시지 표출 여부 (비활성화 false - 기본값, 활성화 true)
  },
}
</script>

<style lang="scss">

</style>