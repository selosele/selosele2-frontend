import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import axios from 'axios';
import { initDefineRule } from './validation';
import { commonComputed } from '@/store/helper';

//import '@/assets/scss/style.scss';

initDefineRule();

const app = createApp({
  extends: App,
  async created() {
    // CSRF Token 세팅
    // JWT 토큰을 통한 인증 방식을 사용한다면, CSRF를 활성화할 필요는 없다.
    // const csrfTokenReq = await axios.get(`${process.env.VUE_APP_API_URL}/auth/csrftoken`);

    // for (const method of ['post', 'put', 'delete']) {
    //   axios.defaults.headers[method]['X-CSRF-TOKEN'] = csrfTokenReq.data.CSRFToken;
    // }
    // console.log(this.$cookies.get('_csrf'));
    // console.log('res.data.CSRFToken >>>', csrfTokenReq.data.CSRFToken);
    // console.log(this.$cookies.get('_csrf') === csrfTokenReq.data.CSRFToken);

    // JWT Token 변조 감지 시 강제 로그아웃
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.commit('SET_TOKEN', token);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('LOGOUT');
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
  baseURL: process.env.VUE_APP_API_URL,
});

app
  .use(store)
  .use(router)
  .mount('#app');
