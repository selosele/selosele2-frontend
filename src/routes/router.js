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
  ...error,               // 에러
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
  // 로그인 중인데 로그인 페이지에 접근 시 리다이렉트
  if (store.getters.isLogin && to.path === '/a/goto') next('/');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogin) {
      // 로그인 되어 있으면 가던 길 가고
      next();
      return;
    }
    // 안되어 있으면 에러 페이지로 리다이렉트
    next('/error');
  } else {
    next();
  }
});

export default router;
