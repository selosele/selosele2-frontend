import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import axios from 'axios';
import { commonComputed } from '@/store/helper';
import moment from 'moment';
import { initDefineRule, isNotBlank, messageUtil } from '@/utils';
import { formModule, layoutModule, uiModule } from './plugins/module';
import { $vfm } from 'vue-final-modal';
import { vfmPlugin } from 'vue-final-modal';

import '@/assets/scss/style.scss';

initDefineRule();

moment.locale('kr');

const app = createApp({
  extends: App,
  async created() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      this.$store.commit('Auth/SET_ACCESS_TOKEN', accessToken);
    }

    this.$http.interceptors.response.use(
      response => response,
      async error => {
        if (isNotBlank(error.response.data.type) && 'biz' === error.response.data.type) {
          // 비즈니스 로직 예외 처리
          messageUtil.toastError(error.response.data.message);
        } else {
          messageUtil.toastError('오류가 발생했습니다.');
        }

        // 권한 오류, JWT 만료/변조 시 강제 로그아웃
        if (401 === error.response.status) {
          const res = await this.$store.dispatch('Auth/LOGOUT', this.$http);
          if ('ok' === res) {
            this.$router.push({
              path: '/',
              query: {
                e: this.$moment().format('YYYYMMDDHHmmss'),
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
   .use(layoutModule)
   .use(uiModule)
   .use(formModule)
   .mount('#app');
