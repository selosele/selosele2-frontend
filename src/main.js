import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import moment from 'moment';
import { setupDefineRule } from '@/utils';
import { formModule, layoutModule, uiModule } from './plugins/module';
import { $vfm } from 'vue-final-modal';
import { vfmPlugin } from 'vue-final-modal';
import VueCookies from 'vue-cookies';
import { http } from '@/api';
import commonMixin from './mixins/common/common';

import '@/assets/scss/style.scss';

// 입력 필드 유효성 검사 설정
setupDefineRule();

// moment locale 설정
moment.locale('ko');

// 관리자 권한 여부 검증을 위한 설정
store.dispatch('Auth/FETCH_IS_ADMIN', 'ROLE_ADMIN');

const app = createApp({
  extends: App,
});

app.mixin({
  ...commonMixin,
});

app.config.globalProperties.$http = http;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$modal = $vfm;

app.use(store)
   .use(router)
   .use(VueCookies)
   .use(vfmPlugin)
   .use(layoutModule)
   .use(uiModule)
   .use(formModule)
   .mount('#app');
