import { createRouter, createWebHistory } from 'vue-router';

import index from './routes/index/index';
import auth from './routes/auth/auth';
import search from './routes/search/search';
import archive from './routes/archive/archive';
import guestbook from './routes/guestbook/guestbook';

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
