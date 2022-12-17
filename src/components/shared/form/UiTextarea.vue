<template>
  <Field :name="name"
         :value="value"
         :rules="rules"
         v-slot="{ field }"
  >

    <textarea :id="id"
              :ref="(el) => { inputEl = el }"
              :name="name"
              :title="title"
              :cols="cols"
              :rows="rows"
              :placeholder="placeholder"
              :readonly="readonly"
              :value="value"
              v-bind="{ ...field, ...$attrs }"
              @input="onInput($event)"
    >
    </textarea>
  </Field>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { ref } from 'vue';
import { Field, ErrorMessage, useField } from 'vee-validate';

export default {
  name: 'ui-textarea',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** textarea id */
    id: String,
    /** textarea name */
    name: String,
    /** textarea title */
    title: String,
    /** textarea placeholder */
    placeholder: String,
    /** textarea cols */
    cols: String,
    /** textarea rows */
    rows: String,
    /** textarea readonly */
    readonly: Boolean,
    /** textarea validation rules */
    rules: String,
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