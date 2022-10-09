export default [
  {
    path: '/a/goto',
    component: () => import('@/views/AppLogin.vue'),
    meta: {
      title: '로그인',
      showSidebar: false,
      showSatis: false,
    },
  },
];
