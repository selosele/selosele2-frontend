<template>
  <Field type="checkbox"
         v-slot="{ field }"
         :name="name"
         :value="getValueByIdx(0)"
         :unchecked-value="getValueByIdx(1)">

    <input type="hidden" :name="name" :value="getValueByIdx(1)">

    <input type="checkbox"
           :id="id"
           :ref="id"
           :title="title"
           :checked="(field.checked = checked)"
           :value="getValueByIdx(0)"
           :unchecked-value="getValueByIdx(1)"
           v-bind="field"
           @change="onChange" />
           
    <label v-if="label" :for="id">
      <span class="sr-only" v-if="labelHidden">{{ label }}</span>
      <template v-else>{{ label }}</template>
    </label>

    <ErrorMessage class="form-field-error" :name="name">
    </ErrorMessage>
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
    id: String,                     // checkbox id
    name: String,                   // checkbox name
    title: String,                  // checkbox title
    checked: Boolean,               // checkbox checked
    label: String,                  // checkbox label
    labelHidden: Boolean,           // checkbox label hidden
    modelValue: [                   // checkbox value
      String,
      Number,
      Boolean,
      Array
    ],
    value: [                        // checkbox true value
      String,
      Number,
      Boolean,
      Array
    ],
    values: String,                 // checkbox true value & false value
  },
  methods: {
    onChange(e) {
      console.log('modelValue >>>', this.modelValue);
      this.$emit('update:modelValue', this.getValue(e));
    },
    getValue(e) {
      if (e.target.checked) {
        return this.values.split(',')[0];
      }
      return this.values.split(',')[1];
    },
    getValueByIdx(i) {
      return this.values.split(',')[i];
    },
  },
}
</script>

<style lang="scss" scoped>

</style>