<template>
  <Field :type="type"
         :name="name"
         :value="value"
         :rules="rules"
         v-slot="{ field }">

    <input :type="type"
           :id="id"
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
</template>

<script>
import { ref } from 'vue';
import { Field, ErrorMessage, useField } from 'vee-validate';

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

</style>