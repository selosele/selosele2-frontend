import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import axios from 'axios';
import { initDefineRule } from './validation';

//import '@/assets/scss/style.scss';

initDefineRule();

const app = createApp(App);

app.config.globalProperties.$rootUrl = window.location.origin;
app.config.globalProperties.$http = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT_URL,
});

app
  .use(store)
  .use(router)
  .mount('#app');
