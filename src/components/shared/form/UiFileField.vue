<template>
  <div :class="`input-wrapper${gapClass}`">
    <Field :name="name"
           :rules="rules"
           :value="value"
           v-slot="{ field, handleChange, handleBlur }">
      <input type="file"
             :name="name"
             :id="id"
             :ref="id"
             :accept="accept"
             :value="value"
             v-bind="{ ...field, ...$attrs }"
             @change="handleChange"
             @blur="handleBlur">
    </Field>

    <label :for="id"
           :class="'input-label btn btn--dark'">{{ label }}
    </label>

    <ErrorMessage class="form-field-error" :name="name">
    </ErrorMessage>

    <slot></slot>
  </div>
</template>

<script>
import { isNotEmpty } from '@/utils';
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-file-field',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** input id */
    id: String,
    /** input name */
    name: String,
    /** input accept */
    accept: String,
    /** block input */
    block: Boolean,
    /** block input */
    gap: [String, Number],
    /** input label */
    label: {
      type: String,
      default: '파일선택',
    },
    /** input 유효성검사 rules */
    rules: String,
    /** input value */
    value: {
      type: Object,
      default: undefined,
    },
    /** input modelValue */
    modelValue: {
      default: '',
    },
  },
  computed: {
    gapClass: {
      get() {
        if (isNotEmpty(this.gap)) {
          return ` d-flex-w gap--${this.gap}`;
        }
        return '';
      },
      set(v) {}
    }
  },
  methods: {
    /** input value 변경 시 */
    onChange(e) {
      console.log(e.target.value);
      this.$emit('update:modelValue', e.target.value);
    },
    /** input blur 시 */
    onBlur(e) {
      this.$emit('blur', e.target.value);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>