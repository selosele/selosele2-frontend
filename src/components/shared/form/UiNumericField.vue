<template>
  <div class="input-wrapper" v-show="!hidden">
    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>

    <Field :type="'number'"
           :name="name"
           :value="`${value}`"
           :rules="rules"
           v-slot="{ field }">

      <input :type="'number'"
             :id="id"
             :class="`input-field input-field--numeric${blockInput}`"
             :ref="(el) => { inputEl = el }"
             :name="name"
             :title="title"
             :placeholder="placeholder"
             :readonly="readonly"
             :disabled="disabled"
             :step="step"
             :min="min"
             :max="max"
             :value="`${value}`"
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
import { Field, ErrorMessage } from 'vee-validate';
import { defineComponent } from 'vue';
import UiTextField from './UiTextField.vue';

export default defineComponent({
  name: 'ui-numeric-field',
  extends: UiTextField,
  setup: UiTextField.setup,
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** 증감 수치 */
    step: [String, Number],
    /** 최소 값 */
    min: [String, Number],
    /** 최대 값 */
    max: [String, Number],
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>