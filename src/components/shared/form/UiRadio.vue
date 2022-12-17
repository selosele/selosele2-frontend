<template>
  <Field type="radio"
         :name="name"
         :id="id"
         :ref="id"
         :title="title"
         :rules="rules"
         :value="value"
         v-model="mv">
  </Field>

  <label v-if="label" :for="id">{{ label }}</label>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-radio',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** radio id */
    id: String,
    /** radio name */
    name: String,
    /** radio title */
    title: String,
    /** radio label */
    label: String,
    /** radio validation rules */
    rules: String,
    /** radio value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** radio modelValue */
    modelValue: {
      default: '',
    }
  },
  computed: {
    mv: {
      get() {
        return this.modelValue;
      },
      set(v) {}
    }
  },
}
</script>

<style lang="scss" scoped>
input[type='radio']:not(.ag-input-field-input) {
  @include sr-only;
  cursor: pointer;
  vertical-align: middle;
}

input[type='radio']:not(.ag-input-field-input) {
  &:focus {
    + label {
      &:before {
        outline: 2px solid $black04;
        outline-offset: 2px;
      }
    }
  }

  &:checked {
    + label {
      &:before {
        border-width: 0.25rem;
        border-color: $main-color;
      }
    }
  }

  + label {
    display: inline-block;
    position: relative;
    margin-right: 0.5rem;
    padding-left: 1.15rem;
    font-size: 0.85rem;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 0.9rem;
      height: 0.9rem;
      margin: auto 0;
      border-radius: 50%;
      border: 2px solid $black02;
      background-color: $grey12;
      box-sizing: border-box;
    }
  }
}
</style>