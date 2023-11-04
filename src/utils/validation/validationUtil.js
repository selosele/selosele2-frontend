import { defineRule, configure } from 'vee-validate';
import { required, min, max, between, numeric } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

/** 입력 필드 유효성 검사 설정 */
export function initDefineRule() {
  
  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('between', between);
  defineRule('numeric', numeric);

  configure({
    generateMessage: localize('ko', {
      messages: {
        required: '필수 입력 항목입니다',
        min: '최소 0:{length}글자 이상이어야 합니다',
        max: '최대 0:{length}글자 이하여야 합니다',
        between: '0:{min}에서 1:{max} 사이여야 합니다',
        numeric: '숫자만 입력 가능합니다',
      },
    }),
  });

}
