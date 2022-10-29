export default [
  {
    path: '/admin/blogconfig',
    component: () => import('@/views/AppBlogConfig.vue'),
    meta: {
      title: '블로그 환경설정',
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    path: '/admin/code',
    component: () => import('@/views/AppCode.vue'),
    meta: {
      title: '공통코드 관리',
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
