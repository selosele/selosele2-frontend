<template>
  <div class="input-wrapper">
    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>

    <Field :type="'number'"
           :name="name"
           :value="value"
           :rules="rules"
           v-slot="{ field }">

      <input :type="'number'"
             :id="id"
             :class="'input-field input-field--numeric'"
             :ref="(el) => { inputEl = el }"
             :name="name"
             :title="title"
             :placeholder="placeholder"
             :readonly="readonly"
             :value="value"
             v-bind="{ ...field, ...$attrs }"
             @input="onInput($event)"
      >
    </Field>

    <ErrorMessage class="form-field-error" :name="name">
    </ErrorMessage>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Field, ErrorMessage, useField } from 'vee-validate';

export default {
  name: 'ui-numeric-field',
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
    /** input placeholder */
    placeholder: String,
    /** input readonly */
    readonly: Boolean,
    /** input label */
    label: String,
    /** input validation rules */
    rules: String,
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

    const inputEl = ref(null);

    const onInput = (e) => {
      emit('update:modelValue', e.target.value);
    };

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