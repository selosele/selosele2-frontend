import { defineRule } from 'vee-validate';

export const initDefineRule = () => {
  
  defineRule('required', value => {
    if (!value || !value.length) {
      return '필수 입력 항목입니다.';
    }
    return true;
  });
  defineRule('maxLength', (value, [limit]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length > limit) {
      return `${limit}자 이하로 입력하세요.`;
    }
    return true;
  });

};
