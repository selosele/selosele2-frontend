import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import axios from 'axios';
import { initDefineRule } from './validation';
import { commonComputed } from '@/store/helper';
import moment from 'moment';
import snackbar from '@/utils/ui/Snackbar';

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
      error => {
        // JWT 만료/변조 시 강제 로그아웃
        if (401 === error.response.status) {
          store.state.token = null;
          
          this.$store.dispatch('LOGOUT')
            .then(res => {
              if (!this.$http.defaults.headers.common) return;
              
              this.$http.defaults.headers.common['Authorization'] = null;
              this.$http.defaults.headers = {
                'Cache-Control': 'no-cache',
              };
              this.$router.push({
                path: '/',
                query: {
                  e: moment().format('YYYYMMDDHHmmss'),
                },
              });
            });
        } else {
          snackbar.error(process.env.VUE_APP_ERR_MSG);
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
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    'Cache-Control': 'no-cache',
  }
});
app.config.globalProperties.$moment = moment;

app
  .use(store)
  .use(router)
  .mount('#app');
