<template>
  <select :id="id"
          :ref="id"
          :name="name"
          :title="title"
          :rules="rules"
          v-bind="$attrs"
          @change="$emit('update:modelValue', $event.target.value)">

    <option value=""
            :disabled="(defaultValueDisabled ? 'disabled' : false)"
            selected v-if="defaultValue">{{ defaultValue }}
    </option>
    
    <template v-if="data && data.length > 0">
      <option v-for="d,i in data"
              :key="i"
              :value="d.value"
              :selected="d.value === selectedValue">{{ d.text }}</option>
    </template>
  </select>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-select',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    id: String,                           // select id
    name: String,                         // select name
    title: String,                        // select title
    rules: String,                        // select validation rules
    selectedValue: [String, Number],      // select selected value
    data: Array,                          // select data
    defaultValue: String,                 // select default value
    defaultValueDisabled: Boolean,        // select default value 비활성화 여부 (비활성화 false - 기본값, 활성화 true)
    modelValue: String,                   // select modelValue
  },
}
</script>

<style lang="scss" scoped>

</style>