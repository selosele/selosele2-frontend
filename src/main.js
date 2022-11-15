import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import axios from 'axios';
import { initDefineRule } from './validation';
import { commonComputed } from '@/store/helper';
import moment from 'moment';
import snackbar from '@/utils/ui/Snackbar';
import AppContentWrapper from '@/components/layout/AppContentWrapper.vue';

//import '@/assets/scss/style.scss';

initDefineRule();

moment.locale('kr');

const app = createApp({
  extends: App,
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.commit('SET_TOKEN', token);
    }
    this.$http.interceptors.response.use(
      response => response,
      async error => {
        snackbar.error('오류가 발생했습니다.');

        // 권한 오류, JWT 만료/변조 시 강제 로그아웃
        if (401 === error.response.status) {
          const res = await this.$store.dispatch('LOGOUT');
          if ('ok' === res) {
            this.$http.defaults.headers.common['Authorization'] = '';
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
app.config.globalProperties.$http = axios.create({
  baseURL: '/api',
  headers: {
    'Cache-Control': 'no-cache',
  }
});
app.config.globalProperties.$moment = moment;

app
  .use(store)
  .use(router)
  .component('AppContentWrapper', AppContentWrapper)
  .mount('#app');
