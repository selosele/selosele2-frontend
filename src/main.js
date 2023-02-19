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
import { axiosInstance } from '@/api';

import '@/assets/scss/style.scss';

initDefineRule();

moment.locale('kr');

const app = createApp({
  extends: App,
});

app.mixin({
  computed: {
    ...commonComputed
  },
});

app.config.globalProperties.$rootUrl = window.location.origin;
app.config.globalProperties.$http = axiosInstance;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$modal = $vfm;

// Production Tip 비활성화(안되는듯)
app.config.warnHandler = (msg, vm, trace) => {
  return null;
};

app.use(store)
   .use(router)
   .use(VueCookies)
   .use(vfmPlugin)
   .use(layoutModule)
   .use(uiModule)
   .use(formModule)
   .mount('#app');
