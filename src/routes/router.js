import { createRouter, createWebHistory } from 'vue-router';

import index from './index/index';
import auth from './auth/auth';
import search from './search/search';
import archive from './archive/archive';
import guestbook from './guestbook/guestbook';

const routes = [
  ...index, // 메인
  ...auth, // 권한
  ...search, // 검색
  ...archive, // 아카이브
  ...guestbook, // 방명록
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
