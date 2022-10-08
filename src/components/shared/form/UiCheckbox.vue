<template>
  <Field type="checkbox"
         v-slot="{ field }"
         :name="name"
         :value="values.split(',')[0]"
         :unchecked-value="values.split(',')[1]">

    <input type="hidden" :name="name" :value="values.split(',')[1]">

    <input type="checkbox"
           :id="id"
           :title="title"
           :class="className"
           :checked="(field.checked = checked)"
           :value="values.split(',')[0]"
           :unchecked-value="values.split(',')[1]"
           v-bind="field"
           @change="$emit('update:modelValue', getValue($event))" />
           
    <label v-if="label"
           :for="id">{{ label }}</label>

    <ErrorMessage class="form-field-error"
                  :name="name" />
  </Field>
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
    id: String,                   // checkbox id
    name: String,                 // checkbox name
    title: String,                // checkbox title
    className: String,            // checkbox class
    checked: Boolean,             // checkbox checked
    label: String,                // checkbox label
    modelValue: String,           // checkbox value
    value: String,                // checkbox true value
    values: String,               // checkbox true value & false value
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