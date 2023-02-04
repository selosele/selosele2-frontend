<template>
  <div class="radio-wrapper" v-show="!hidden">
    <Field type="radio"
           :name="name"
           :id="id"
           :ref="id"
           :title="title"
           :rules="rules"
           :value="value"
           v-model="mv">
    </Field>

    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>

    <ErrorMessage class="form-field-error" :name="name">
    </ErrorMessage>
  </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-radio',
  inheritAttrs: false,
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** radio id */
    id: String,
    /** radio name */
    name: String,
    /** radio title */
    title: String,
    /** radio label */
    label: String,
    /** radio validation rules */
    rules: String,
    /** radio 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** radio value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** radio modelValue */
    modelValue: {
      default: '',
    }
  },
  computed: {
    mv: {
      get() {
        return this.modelValue;
      },
      set(v) {}
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>