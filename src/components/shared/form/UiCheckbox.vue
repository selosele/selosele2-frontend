<template>
  <input type="checkbox"
         :id="id"
         :name="name"
         :title="title"
         :class="className"
         :checked="checked"
         :true-value="values.split(',')[0]"
         :false-value="values.split(',')[1]"
         @change="$emit('update:modelValue', getValue($event))" />

  <label v-if="label"
         :for="id">{{ label }}</label>

  <ErrorMessage v-if="showMsg !== '0' || showMsg === '1'"
                class="form-field-error"
                :name="name" />
</template>

<script>
import { ErrorMessage } from 'vee-validate';

export default {
  name: 'UiCheckbox',
  components: {
    ErrorMessage,
  },
  props: {
    id: String,                   // checkbox id
    name: String,                 // checkbox name
    title: String,                // checkbox title
    className: String,            // checkbox class
    checked: Boolean,             // checkbox checked
    label: String,                // checkbox label
    modelValue: String,           // checkbox value
    values: String,               // checkbox true value & false value
    trueValue: String,            // checkbox true value
    falseValue: String,           // checkbox false value
    showMsg: String,              // checkbox validation 에러메시지 표출 여부 (비활성화 0 - 기본값, 활성화 1)
  },
  methods: {
    getValue(e) {
      if (e.target.checked) {
        return this.values.split(',')[0];
      }
      return this.values.split(',')[1];
    },
  },
}
</script>

<style lang="scss">

</style>