import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import axios from 'axios';
import { initDefineRule } from './validation';
import { commonComputed } from '@/store/helper';
import moment from 'moment';
import messageUtil from '@/utils/ui/MessageUtil';
import AppContentWrapper from '@/components/layout/AppContentWrapper.vue';
import UiModal from '@/components/shared/modal/UiModal.vue';
import UiButton from '@/components/shared/button/UiButton.vue';
import { $vfm } from 'vue-final-modal';
import { vfmPlugin } from 'vue-final-modal';

import '@/assets/scss/style.scss';

initDefineRule();

moment.locale('kr');

const app = createApp({
  extends: App,
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.commit('Auth/SET_TOKEN', token);
    }
    this.$http.interceptors.response.use(
      response => response,
      async error => {
        messageUtil.toastError('오류가 발생했습니다.');

        // 권한 오류, JWT 만료/변조 시 강제 로그아웃
        if (401 === error.response.status) {
          const res = await this.$store.dispatch('Auth/LOGOUT', this.$http);
          if ('ok' === res) {
            this.$router.push({
              path: '/',
              query: {
                e: moment().format('YYYYMMDDHHmmss'),
              },
            });
          }
        }
        // 404 에러
        if (404 === error.response.status) {
          this.$router.push('/error');
        }

        return Promise.reject(error);
      }
    );
  }
});

app.mixin({
  computed: {
    ...commonComputed
  },
});

app.config.globalProperties.$rootUrl = window.location.origin;
app.config.globalProperties.$nowUrl = window.location.href;
app.config.globalProperties.$http = axios.create({
  baseURL: '/api',
  headers: {
    'Cache-Control': 'no-cache',
  }
});
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$modal = $vfm;

// Production Tip 비활성화(안되는듯)
app.config.warnHandler = (msg, vm, trace) => {
  return null;
};

app.use(store)
   .use(router)
   .use(vfmPlugin)
   .component('app-content-wrapper', AppContentWrapper)
   .component('ui-modal', UiModal)
   .component('ui-button', UiButton)
   .mount('#app');
