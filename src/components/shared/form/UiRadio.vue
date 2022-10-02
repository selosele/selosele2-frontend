<template>
  <Field type="radio"
         v-slot="{ field }"
         :name="name"
         :value="modelValue">

    <input type="radio"
           :id="id"
           :title="title"
           :class="className"
           :checked="(field.checked = checked)"
           :value="modelValue"
           v-bind="field"
           @change="$emit('update:modelValue', $event.target.value)" />

    <label v-if="label"
          :for="id">{{ label }}</label>

    <ErrorMessage v-if="showMsg !== false || showMsg"
                  class="form-field-error"
                  :name="name" />
  </Field>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'UiRadio',
  components: {
    Field,
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
    showMsg: Boolean,             // radio validation 에러메시지 표출 여부 (비활성화 false - 기본값, 활성화 true)
  },
}
</script>

<style lang="scss">

</style>