import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import axios from 'axios';
import { initDefineRule } from './validation';

//import '@/assets/scss/style.scss';

initDefineRule();

const app = createApp({
  extends: App,
  created() {
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

app.config.globalProperties.$rootUrl = window.location.origin;
app.config.globalProperties.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

app
  .use(store)
  .use(router)
  .mount('#app');
