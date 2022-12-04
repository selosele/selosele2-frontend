import { defineRule, configure } from 'vee-validate';
import { required, min, max } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

export const initDefineRule = () => {
  
  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);

  configure({
    generateMessage: localize('ko', {
      messages: {
        required: '필수 입력 항목입니다.',
        min: '0:{length}자 이상 입력하세요.',
        max: '0:{length}자 이하로 입력하세요.',
      },
    }),
  });

};
