<template>
  <Field
    type="hidden"
    :name="name"
    :value="value"
    v-slot="{ field }">

    <input
      type="hidden"
      :id="id"
      :ref="(el) => { inputEl = el }"
      :name="name"
      :value="value"
      v-bind="{ ...field, ...$attrs }"
    />
  </Field>
</template>

<script>
import { ref } from 'vue';
import { Field, useField } from 'vee-validate';

export default {
  name: 'UiHiddenField',
  components: {
    Field,
  },
  props: {
    /** input id */
    id: String,
    /** input name */
    name: String,
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

    /** input 요소 */
    const inputEl = ref(null);

    return {
      inputEl,
    };
  },
}
</script>

<style lang="scss" scoped>

</style>