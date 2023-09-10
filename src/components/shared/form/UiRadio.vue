<template>
  <div :class="['radio-wrapper', ...clazz]" v-show="!hidden">
    <Field type="radio"
           :name="name"
           :id="id"
           :ref="id"
           :rules="rules"
           :value="value"
           v-bind="$attrs"
           v-model="mv"
           @change="onChange">
    </Field>

    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>

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
    /** radio class */
    clazz: {
      type: Array,
      default: () => []
    },
    /** radio name */
    name: String,
    /** radio label */
    label: String,
    /** radio validation rules */
    rules: String,
    /** radio 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** 오류 메시지 tooltip 사용 여부 */
    tooltip: {
      type: Boolean,
      default: false,
    },
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
  methods: {
    onChange(e) {
      this.$emit('onchange', e.target.value);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>