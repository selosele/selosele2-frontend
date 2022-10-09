import { createRouter, createWebHistory } from 'vue-router';

import index from './index/index';
import error from './error/error';
import auth from './auth/auth';
import search from './search/search';
import archive from './archive/archive';
import guestbook from './guestbook/guestbook';
import blogConfig from './blog-config/blog-config';
import store from '@/store/store';

const routes = [
  ...index,               // 메인
  ...error,
  ...auth,                // 권한
  ...search,              // 검색
  ...archive,             // 아카이브
  ...guestbook,           // 방명록
  ...blogConfig,          // 블로그 환경설정
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 로그인 여부에 따른 페이지 접근 처리
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogin) {
      next();
      return;
    }
    next('/error');
  } else {
    next();
  }
});

export default router;
