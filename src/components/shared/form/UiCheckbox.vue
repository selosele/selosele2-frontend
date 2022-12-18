<template>
  <Field type="checkbox"
         :name="name"
         :id="id"
         :ref="id"
         :title="title"
         :rules="rules"
         :value="value || getValueByIdx(0)"
         :unchecked-value="getValueByIdx(1)"
         v-bind="$attrs"
         v-model="mv"
         @change="onChange($event)">
  </Field>

  <label v-if="label" :for="id">
    <span class="sr-only" v-if="labelHidden">{{ label }}</span>
    <template v-else>{{ label }}</template>
  </label>

  <ErrorMessage class="form-field-error" :name="name">
  </ErrorMessage>
</template>

<script>
import { isBlank } from '@/utils/util';
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'ui-checkbox',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    /** checkbox id */
    id: String,
    /** checkbox name */
    name: String,
    /** checkbox title */
    title: String,
    /** checkbox checked */
    checked: Boolean,
    /** checkbox label */
    label: String,
    /** checkbox label hidden */
    labelHidden: Boolean,
    /** checkbox validation rules */
    rules: String,
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
input[type='checkbox']:not(.ag-input-field-input) {
  @include sr-only;
  cursor: pointer;
  vertical-align: middle;
}

input[type='checkbox']:not(.ag-input-field-input) {
  &:focus {
    + label {
      &:before {
        outline: 2px solid $black04;
        outline-offset: 1px;
      }
    }
  }

  &:checked {
    + label {
      &:before {
        content: '\e928';
      }
    }
  }

  + label {
    display: inline-block;
    position: relative;
    margin-right: 0.5rem;
    padding-left: 1.3rem;
    font-size: 0.85rem;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 0.85rem;
      height: 0.85rem;
      margin: auto 0;
      border: 2px solid $main-color;
      background-color: $grey12;
      font-family: $icon-font;
      font-weight: 700;
      font-size: 0.95rem;
      line-height: 0.7rem;
      color: $black;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }
  }
}
</style>