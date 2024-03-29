<template>
  <div :class="['checkbox-wrapper', ...clazz]" v-show="!hidden">
    <Field
      type="checkbox"
      :name="name"
      :id="id"
      :ref="id"
      :rules="rules"
      :readonly="readonly"
      :disabled="disabled"
      :value="value || getValueByIdx(0)"
      :unchecked-value="getValueByIdx(1)"
      v-bind="$attrs"
      v-model="mv"
      @change="onChange($event)"
    />

    <label
      :for="id"
      :class="'input-label'"
      v-if="label"
    >
      <span class="sr-only" v-if="hideLabel">{{ label }}</span>
      <template v-else>{{ label }}</template>
    </label>

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
import { isBlank } from '@/utils';
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'UiCheckbox',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** checkbox id */
    id: String,
    /** checkbox class */
    clazz: {
      type: Array,
      default: () => []
    },
    /** checkbox name */
    name: String,
    /** checkbox checked */
    checked: Boolean,
    /** checkbox label */
    label: String,
    /** checkbox label 숨김 여부 */
    hideLabel: Boolean,
    /** checkbox validation rules */
    rules: String,
    /** checkbox readonly */
    readonly: Boolean,
    /** checkbox disabled */
    disabled: Boolean,
    /** checkbox 숨김 여부 */
    hidden: {
      type: Boolean,
      default: false,
    },
    /** 오류 메시지 tooltip 사용 여부 */
    tooltip: {
      type: Boolean,
      default: false,
    },
    /** checkbox modelValue */
    modelValue: {
      default: '',
    },
    /** checkbox true value */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /** checkbox true value & false value */
    values: String,
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
    /** change 이벤트 */
    onChange(e) {
      // 2022.12.18. 체크박스 체크 해제가 안되서 임시 주석 처리
      // this.$emit('update:modelValue', e.target.value);
    },
    /** 체크 여부에 따라 value 가져오기 */
    getValue(e) {
      if (e.target.checked) {
        if (isBlank(this.values)) return '';
        return this.values.split(',')[0];
      }
      return this.values.split(',')[1];
    },
    /** index로 value 가져오기 */
    getValueByIdx(i) {
      if (isBlank(this.values)) return '';
      return this.values.split(',')[i];
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>