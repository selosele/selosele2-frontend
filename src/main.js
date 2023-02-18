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
import VueCookies from 'vue-cookies';
import { authService } from '@/services/auth/authService';

import '@/assets/scss/style.scss';

initDefineRule();

moment.locale('kr');

const app = createApp({
  extends: App,
  async created() {
    const accessToken = authService.getAccessToken();
    
    if (accessToken) {
      this.$store.commit('Auth/SET_ACCESS_TOKEN', accessToken);
    }

    /** 액세스 토큰 갱신 요청이 진행 중인지 확인하는 flag 변수 */
    let isRefreshing = false;
    /** 새 액세스 토큰을 기다리는 모든 요청을 저장하는 배열 */
    let refreshSubscribers = [];

    this.$http.interceptors.request.use(
      async config => {
        if (authService.getAccessToken()) {

          /**
           * 액세스 토큰 갱신
           *   - 액세스 토큰을 갱신하기 위한 다중 요청을 방지하고 요청이 차례로 대기열에 추가되고 실행되도록 한다.
           */
          
          // 액세스 토큰의 남은 시간이 1분 이하면 갱신을 한다.
          if (!authService.isValidAccessToken(60)) {
            const originalRequest = config;

            if (!isRefreshing) {
              // flag 변수가 true인 동안, 새 액세스 토큰이 필요한 다른 요청은 토큰이 갱신될 때까지 대기한다.
              isRefreshing = true;

              try {
                const { data } = await axios.post('/api/auth/refresh');
                const accessToken = data?.accessToken;

                authService.setAccessToken(accessToken);
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                refreshSubscribers.forEach((subscriber) => subscriber(accessToken));
              } catch(err) {
                console.log(err);
              } finally {
                // 액세스 토큰이 갱신되면 flag 변수에 false를 할당해서, 대기 중인 모든 요청은 새 토큰을 받게 된다.
                isRefreshing = false;
                refreshSubscribers = [];
              }
            }

            const accessToken = await new Promise((resolve) => {
              refreshSubscribers.push((token) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                resolve(token);
              });
            });

            return config;
          }
          config.headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.$http.interceptors.response.use(
      response => response,
      async error => {
        if (isNotBlank(error?.response?.data?.type) && 'biz' === error?.response?.data?.type) {
          // 비즈니스 로직 예외 처리
          messageUtil.toastError(error.response.data?.message);
        } else {
          messageUtil.toastError('오류가 발생했습니다.');
        }

        // 권한 에러 또는 JWT 만료/변조 시
        if (401 === error?.response?.status) {
          const errVal = this.$moment().format('YYYYMMDDHHmmss');

          authService.logout(this.$store, this.$http, this.$router, errVal);
        }

        // 404 에러
        if (404 === error?.response?.status) {
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
