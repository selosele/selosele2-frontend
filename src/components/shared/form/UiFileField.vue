<template>
  <div :class="`input-wrapper${gapClass}${inlineInput}`" v-show="!hidden">
    <Field type="file"
           :name="name"
           :id="id"
           :ref="id"
           :title="title"
           :accept="accept"
           :rules="rules"
           v-bind="$attrs"
           @change="onChange"
           @blur="onBlur">
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
  inheritAttrs: false,
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** input id */
    id: String,
    /** input name */
    name: String,
    /** input title */
    title: String,
    /** input accept */
    accept: String,
    /** block input */
    block: Boolean,
    /** inline input */
    inline: Boolean,
    /** block input */
    gap: [String, Number],
    /** input label */
    label: {
      type: String,
      default: '파일선택',
    },
    /** input 유효성검사 rules */
    rules: String,
    /** input 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
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
    },
    inlineInput: {
      get() {
        if (isNotEmpty(this.inline) && true === this.inline) {
          return ` input-wrapper--inline-block`;
        }
        return '';
      },
      set(v) {}
    }
  },
  methods: {
    /** input value 변경 시 */
    onChange({ target: { files } }) {
      this.$emit('onchange', files[0]);
    },
    /** input blur 시 */
    onBlur() {
      this.$emit('onblur');
    },
  },
}
</script>

<style lang="scss" scoped>

</style>