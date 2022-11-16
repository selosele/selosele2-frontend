import { createRouter, createWebHistory } from 'vue-router';
import index from './index/index';
import error from './error/error';
import auth from './auth/auth';
import post from './post/post';
import search from './search/search';
import archive from './archive/archive';
import guestbook from './guestbook/guestbook';
import admin from './admin/admin';
import store from '@/store/store';
import messageUtil from '@/utils/ui/MessageUtil';
import { isEmpty } from '@/utils/util';

const routes = [
  ...index,               // 메인
  ...error,               // 에러
  ...auth,                // 권한
  ...post,                // 검색
  ...search,              // 검색
  ...archive,             // 아카이브
  ...guestbook,           // 방명록
  ...admin,               // 블로그 관리
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 }; // 새 경로로 이동할 때 스크롤 위치를 초기화해준다.
  },
});

router.beforeEach((to, from, next) => {

  if (isEmpty(to.meta.showSidebar)) {
    to.meta.showSidebar = true;
  }
  if (isEmpty(to.meta.showSatis)) {
    to.meta.showSatis = true;
  }

  // 로그인 중인데 로그인 페이지에 접근 시 리다이렉트
  if (store.getters.isLogin && '/a/goto' === to.path) {
    messageUtil.toastInfo('이미 로그인되어 있습니다.');
    next('/');
  }

  // 로그인이 필요한 페이지
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
