<template>
  <Form :name="name"
        @submit="onSubmit"
        @reset="$emit('onReset')"
  >
    <slot></slot>
  </Form>
</template>

<script>
import { isEmpty } from '@/utils/util';
import { Form } from 'vee-validate';

export default {
  name: 'ui-form',
  props: {
    name: String  // form name
  },
  components: {
    Form,
  },
  methods: {
    onSubmit(values) {
      const formValues = this.getFormValues();
      this.$emit('onSubmit', formValues);
    },
    /**
     * Form Values -> JSON으로 가공
     * Form Values를 onSubmit() 메서드의 values 파라미터로 받을시,
     * 처음부터 checked 상태인 체크박스, 라디오 버튼의 값을 못 가져오는 문제가 있어 커스텀 메서드를 만들었다.
     */
    getFormValues() {
      if (isEmpty(this.name)) {
        throw new Error('Form name 속성값이 누락되었습니다.');
      }

      const form = document.getElementsByName(this.name);

      if (1 < form.length) {
        throw new Error('Form name 속성값이 중복되었습니다.');
      }
      
      const data = new FormData(form[0]);
      let obj = {};

      data.forEach((value, key) => obj[key] = value);
      
      return obj;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>