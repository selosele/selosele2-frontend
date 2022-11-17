export default [
  {
    // 로그인 페이지
    path: '/a/goto',
    component: () => import('@/views/AppLogin.vue'),
    meta: {
      showSidebar: false,
      showSatis: false,
    },
  },
];
