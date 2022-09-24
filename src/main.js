import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { defineRule } from 'vee-validate';

defineRule('required', value => {
  if (!value || !value.length) {
    return '필수 입력 항목입니다.';
  }
  return true;
});
defineRule('maxLength', (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length > limit) {
    return `${limit}자 이하로 입력하세요.`;
  }
  return true;
});

//import '@/assets/scss/style.scss';

const app = createApp(App);

app
  .use(store)
  .use(router)
  .mount('#app');
