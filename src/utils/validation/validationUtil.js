import { defineRule, configure } from 'vee-validate';
import { required, min, max, between, numeric } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

/** 입력 필드 유효성 검사 세팅 */
export function initDefineRule() {
  
  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('between', between);
  defineRule('numeric', numeric);

  configure({
    generateMessage: localize('ko', {
      messages: {
        required: '필수 입력 항목입니다.',
        min: '0:{length}자 이상 입력하세요.',
        max: '0:{length}자 이하로 입력하세요.',
        between: '0:{min} ~ 1:{max} 사이로 입력하세요.',
        numeric: '정수만 입력 가능합니다.',
      },
    }),
  });

}
