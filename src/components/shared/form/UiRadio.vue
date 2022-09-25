<template>
  <input type="radio"
         :id="id"
         :name="name"
         :title="title"
         :class="className"
         :checked="checked"
         :value="modelValue"
         @change="$emit('update:modelValue', $event.target.value)" />

  <label v-if="label"
         :for="id">{{ label }}</label>

  <ErrorMessage v-if="showMsg !== '0' || showMsg === '1'"
                class="form-field-error"
                :name="name" />
</template>

<script>
import { ErrorMessage } from 'vee-validate';

export default {
  name: 'UiRadio',
  components: {
    ErrorMessage,
  },
  props: {
    id: String,                   // radio id
    name: String,                 // radio name
    title: String,                // radio title
    className: String,            // radio class
    checked: Boolean,             // radio checked
    label: String,                // radio label
    modelValue: String,           // radio value
    showMsg: String,              // radio validation 에러메시지 표출 여부 (비활성화 0 - 기본값, 활성화 1)
  },
}
</script>

<style lang="scss">

</style>