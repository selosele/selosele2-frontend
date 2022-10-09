export default [
  {
    path: '/blogconfig',
    component: () => import('@/views/AppBlogConfig.vue'),
    meta: {
      title: '블로그 환경설정',
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
