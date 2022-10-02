<template>
  <select :id="id"
          :name="name"
          :title="title"
          :class="className"
          :rules="rules"
          @change="$emit('update:modelValue', $event.target.value)">

    <option value=""
            :disabled="(defaultValueDisabled ? 'disabled' : false)"
            selected v-if="defaultValue">{{ defaultValue }}
    </option>
    
    <template v-if="data && data.length > 0">
      <option v-for="d in data"
              :key="d.value"
              :value="d.value"
              :selected="d.value === selectedValue">{{ d.text }}</option>
    </template>
  </select>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'UiSelect',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    id: String,                           // select id
    name: String,                         // select name
    title: String,                        // select title
    className: String,                    // select class
    rules: String,                        // select validation rules
    selectedValue: [String, Number],      // select selected value
    data: Array,                          // select data
    defaultValue: String,                 // select default value
    defaultValueDisabled: Boolean,        // select default value 비활성화 여부 (비활성화 false - 기본값, 활성화 true)
    modelValue: String,                   // select modelValue
    showMsg: Boolean,                     // select validation 에러메시지 표출 여부 (비활성화 false - 기본값, 활성화 true)
  },
}
</script>

<style lang="scss">

</style>