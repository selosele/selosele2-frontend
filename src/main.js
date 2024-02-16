import { createApp } from 'vue';
import { setupDefineRule } from '@/utils';
import { http } from '@/api';
import { $vfm } from 'vue-final-modal';
import { vfmPlugin } from 'vue-final-modal';
import { formModule, layoutModule, uiModule } from './plugins/module';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import VueCookies from 'vue-cookies';
import commonMixin from './mixins/common/common';

import '@/assets/scss/style.scss';

// 입력 필드 유효성 검사 설정
setupDefineRule();

// 관리자 권한 여부 검증을 위한 설정
store.dispatch('Auth/FETCH_IS_ADMIN', 'ROLE_ADMIN');

const app = createApp({
  extends: App,
});

app.mixin({
  ...commonMixin,
});

app.config.globalProperties.$http = http;
app.config.globalProperties.$modal = $vfm;

app.use(store)
   .use(router)
   .use(VueCookies)
   .use(vfmPlugin)
   .use(layoutModule)
   .use(uiModule)
   .use(formModule)
   .mount('#app');
