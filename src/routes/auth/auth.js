export default [
  {
    // 로그인 페이지
    path: '/login',
    component: () => import('@/views/AppLogin.vue'),
    meta: {
      showSidebar: false,
      showSatis: false,
    },
  },
];
