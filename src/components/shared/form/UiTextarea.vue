<template>
  <div :class="['input-wrapper', inlineInput]" v-show="!hidden">
    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>

    <Field :name="name"
           :value="value"
           :rules="rules"
           v-slot="{ field }"
    >

      <textarea :id="id"
                :ref="(el) => { inputEl = el }"
                :class="[blockTextarea, resizeClass, ...clazz]"
                :name="name"
                :cols="cols"
                :rows="rows"
                :readonly="readonly"
                :value="value"
                v-bind="{ ...field, ...$attrs }"
                @input="onInput($event)"
                @change="onChange($event)"
                @keyup.enter="onEnter($event)"
      >
      </textarea>
    </Field>

    <ErrorMessage
      :class="{
        'form-field-error': true,
        'form-field-error--tooltip': tooltip,
      }"
      :name="name">
    </ErrorMessage>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { Field, ErrorMessage, useField } from 'vee-validate';
import { isNotEmpty } from '@/utils';

export default {
  name: 'ui-textarea',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** textarea id */
    id: String,
    /** textarea class */
    clazz: {
      type: Array,
      default: () => []
    },
    /** textarea name */
    name: String,
    /** textarea cols */
    cols: String,
    /** textarea rows */
    rows: String,
    /** textarea readonly */
    readonly: Boolean,
    /** textarea label */
    label: String,
    /** textarea validation rules */
    rules: String,
    /** block textarea */
    block: Boolean,
    /** inline textarea */
    inline: Boolean,
    /** textarea resize */
    resize: String,
    /** textarea 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** 에러메시지 tooltip 사용 여부 */
    tooltip: {
      type: Boolean,
      default: false,
    },
    /** textarea value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** textarea modelValue */
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

    /** block textarea */
    const blockTextarea = computed({
      get() {
        if (isNotEmpty(props.block) && true === props.block) {
          return ' input-field is--block';
        }
        return '';
      },
      set(v) {}
    });

    /** block textarea */
    const inlineInput = computed({
      get() {
        if (isNotEmpty(props.inline) && true === props.inline) {
          return ` input-wrapper--inline-block`;
        }
        return '';
      },
      set(v) {}
    });

    const resizeClass = computed({
      get() {
        if (isNotEmpty(props.resize)) {
          if ('vertical' === props.resize) return ' resize--vertical';
          if ('horizontal' === props.resize) return ' resize--horizontal';
        }
        return '';
      },
      set(v) {}
    });

    /** textarea 요소 */
    const inputEl = ref(null);

    /** textarea value 변경 시 */
    const onInput = (e) => {
      emit('update:modelValue', e.target.value);
    };

    /** textarea value 변경 시 */
    const onChange = (e) => {
      emit('onchange', e.target.value);
    };

    /** Enter키 입력 시 */
    const onEnter = (e) => {
      emit('onenter', e.target.value);
    };

    /** textarea 요소에 focus */
    const focus = () => {
      inputEl.value.focus();
    };

    return {
      blockTextarea,
      inlineInput,
      resizeClass,
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