<template>
  <div :class="['input-wrapper', inlineInput]" v-show="!hidden">
    <label
      :for="id"
      :class="'input-label'"
      v-if="label">{{ label }}
    </label>

    <Field
      :type="type"
      :name="name"
      :value="value"
      :rules="rules"
      v-slot="{ field }">

      <input
        :type="type"
        :id="id"
        :class="['input-field', blockInput, ...clazz]"
        :ref="(el) => { inputEl = el }"
        :name="name"
        :readonly="readonly"
        :value="value"
        v-bind="{ ...field, ...$attrs }"
        @input="onInput($event)"
        @change="onChange($event)"
        @keyup.enter="onEnter($event)"
      />
    </Field>

    <span
      v-if="text"
      v-text="text"
      :class="'input-field-text'"
    />

    <ErrorMessage
      :class="{
        'form-field-error': true,
        'form-field-error--tooltip': tooltip,
      }"
      :name="name"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { Field, ErrorMessage, useField } from 'vee-validate';
import { isNotEmpty } from '@/utils';

export default {
  name: 'UiTextField',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** input type */
    type: String,
    /** input id */
    id: String,
    /** input class */
    clazz: {
      type: Array,
      default: () => []
    },
    /** input name */
    name: String,
    /** input readonly */
    readonly: Boolean,
    /** input label */
    label: String,
    /** input 유효성검사 rules */
    rules: String,
    /** block input */
    block: Boolean,
    /** inline input */
    inline: Boolean,
    /** input text */
    text: String,
    /** input 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** 오류 메시지 tooltip 사용 여부 */
    tooltip: {
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

    const blockInput = computed({
      get() {
        if (isNotEmpty(props.block) && true === props.block) {
          return ` input-field is--block`;
        }
        return '';
      },
      set(v) {}
    });

    const inlineInput = computed({
      get() {
        if (isNotEmpty(props.inline) && true === props.inline) {
          return ` input-wrapper--inline-block`;
        }
        return '';
      },
      set(v) {}
    });

    /** input 요소 */
    const inputEl = ref(null);

    /** input value 변경 시 */
    const onInput = (e) => {
      emit('update:modelValue', e.target.value);
    };

    /** input value 변경 시 */
    const onChange = (e) => {
      emit('onchange', e.target.value);
    };

    /** Enter키 입력 시 */
    const onEnter = (e) => {
      emit('onenter', e.target.value);
    };

    /** input 요소에 focus */
    const focus = () => {
      inputEl.value.focus();
    };

    return {
      blockInput,
      inlineInput,
      inputEl,
      onInput,
      onChange,
      onEnter,
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