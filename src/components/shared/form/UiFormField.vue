<template>
  <Field :type="type"
         :id="id"
         :name="name"
         :title="title"
         :class="className"
         :placeholder="placeholder"
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
  name: 'UiFormField',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    type: String,               // input type
    id: String,                 // input id
    name: String,               // input name
    title: String,              // input title
    className: String,          // input class
    placeholder: String,        // input placeholder
    rules: String,              // input validation rules
    modelValue: String,         // input modelValue
    showMsg: Boolean,           // input validation 에러메시지 표출 여부 (비활성화 false - 기본값, 활성화 true)
  },
}
</script>

<style lang="scss">

</style>