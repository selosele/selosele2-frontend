import { createRouter, createWebHistory } from 'vue-router';
import Index from './views/Index';
import Login from './views/Login';

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: null,
    },
  },
  {
    path: '/a/goto',
    component: Login,
    meta: {
      title: '로그인',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
