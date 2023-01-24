<template>
  <div class="input-wrapper" v-show="!hidden">
    <label :for="id"
           :class="'input-label'"
           v-if="label">{{ label }}
    </label>
    
    <Field as="select"
           :id="id"
           :ref="id"
           :name="name"
           :title="title"
           :class="`input-field${selectBlock}`"
           :rules="rules"
           v-bind="$attrs"
           v-model="mv"
           @change="onChange">

      <option value=""
        :disabled="defaultValueDisabled"
        selected v-if="defaultValue">{{ defaultValue }}
      </option>
      
      <template v-if="data && 0 < data.length">
        <option v-for="d,i in data"
                :key="i"
                :value="d.value"
                :selected="d.value == selectedValue"
                :disabled="disabled">{{ d.text }}</option>
      </template>
    </Field>

    <ErrorMessage class="form-field-error" :name="name">
    </ErrorMessage>
  </div>
</template>

<script>
import { isNotEmpty } from '@/utils';
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-select',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** select id */
    id: String,
    /** select name */
    name: String,
    /** select title */
    title: String,
    /** select disabled */
    disabled: Boolean,
    /** select label */
    label: String,
    /** select validation rules */
    rules: String,
    /** block select */
    block: Boolean,
    /** select default value */
    defaultValue: [String, Number],
    /** select selected value */
    selectedValue: [String, Number],
    /** select data */
    data: Array,
    /** select default value 비활성화 여부 (비활성화 false - 기본값, 활성화 true) */
    defaultValueDisabled: Boolean,
    /** select 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** select modelValue */
    modelValue: String,
  },
  computed: {
    mv: {
      get() {
        return this.modelValue;
      },
      set(v) {}
    },
    /** select block 스타일 */
    selectBlock() {
      if (isNotEmpty(this.block) && true === this.block) {
        return ` is--block`;
      }
      return '';
    },
  },
  methods: {
    onChange($event) {
      this.$emit('onchange', $event.target.value);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>