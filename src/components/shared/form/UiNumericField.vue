<template>
  <div :class="['input-wrapper', inlineInput, ...clazz]" v-show="!hidden">
    <label
      :for="id"
      :class="'input-label'"
      v-if="label">{{ label }}
    </label>

    <Field
      :type="'number'"
      :name="name"
      :value="`${value}`"
      :rules="rules"
      v-slot="{ field }"
    >

      <input
        :type="'number'"
        :id="id"
        :class="['input-field--numeric', blockInput]"
        :ref="(el) => { inputEl = el }"
        :name="name"
        :value="`${value}`"
        v-bind="{ ...field, ...$attrs }"
        @input="onInput($event)"
      >
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
import { Field, ErrorMessage } from 'vee-validate';
import { defineComponent } from 'vue';
import UiTextField from './UiTextField.vue';

export default defineComponent({
  name: 'UiNumericField',
  extends: UiTextField,
  setup: UiTextField.setup,
  components: {
    Field,
    ErrorMessage,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>