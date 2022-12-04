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
    id: String,                 // textarea id
    name: String,               // textarea name
    title: String,              // textarea title
    placeholder: String,        // textarea placeholder
    cols: String,               // textarea cols
    rows: String,               // textarea rows
    readonly: Boolean,          // textarea readonly
    rules: String,              // textarea validation rules
    value: {                    // textarea value
      type: [String, Number],
      default: undefined,
    },        
    modelValue: {               // textarea modelValue
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