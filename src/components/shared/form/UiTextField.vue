<template>
  <div class="input-wrapper" v-show="!hidden">
    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>

    <Field :type="type"
           :name="name"
           :value="value"
           :rules="rules"
           v-slot="{ field }">

      <input :type="type"
             :id="id"
             :class="`input-field${blockInput}`"
             :ref="(el) => { inputEl = el }"
             :name="name"
             :title="title"
             :placeholder="placeholder"
             :readonly="readonly"
             :autocomplete="autocomplete"
             :value="value"
             v-bind="{ ...field, ...$attrs }"
             @input="onInput($event)"
      >
    </Field>

    <span v-if="text"
          v-text="text"
          :class="'input-field-text'">
    </span>

    <ErrorMessage class="form-field-error" :name="name">
    </ErrorMessage>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Field, ErrorMessage, useField } from 'vee-validate';
import { isNotEmpty } from '@/utils';

export default {
  name: 'ui-text-field',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** input type */
    type: String,
    /** input id */
    id: String,
    /** input name */
    name: String,
    /** input title */
    title: String,
    /** input placeholder */
    placeholder: String,
    /** input readonly */
    readonly: Boolean,
    /** input label */
    label: String,
    /** input autocomplete */
    autocomplete: String,
    /** input 유효성검사 rules */
    rules: String,
    /** block input */
    block: Boolean,
    /** input text */
    text: String,
    /** input 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** input value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** input modelValue */
    modelValue: {
      default: '',
    },
  },
  computed: {
    blockInput: {
      get() {
        if (isNotEmpty(this.block) && true === this.block) {
          return ` input-field is--block`;
        }
        return '';
      },
      set(v) {}
    }
  },
  setup(props, { emit }) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
      valueProp: props.modelValue,
    });

    /** input 요소 */
    const inputEl = ref(null);

    /** input value 변경 시 */
    const onInput = (e) => {
      emit('update:modelValue', e.target.value);
    };

    /** input 요소에 focus */
    const focus = () => {
      inputEl.value.focus();
    };

    return {
      inputEl,
      onInput,
      focus,
      handleChange,
      errorMessage,
      inputValue,
      meta,
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>