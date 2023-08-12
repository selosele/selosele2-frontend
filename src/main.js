import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { commonComputed } from '@/store/helper';
import moment from 'moment';
import { initDefineRule } from '@/utils';
import { formModule, layoutModule, uiModule } from './plugins/module';
import { $vfm } from 'vue-final-modal';
import { vfmPlugin } from 'vue-final-modal';
import VueCookies from 'vue-cookies';
import { http } from '@/api';

import '@/assets/scss/style.scss';

initDefineRule();

moment.locale('ko');

const app = createApp({
  extends: App,
});

app.mixin({
  computed: {
    ...commonComputed
  },
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
