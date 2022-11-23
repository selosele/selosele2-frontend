export default [
  {
    // 블로그 환경설정 페이지
    path: '/admin/blog-config',
    component: () => import('@/views/AppBlogConfig.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 공통코드 관리 페이지
    path: '/admin/code',
    component: () => import('@/views/AppCode.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 만족도조사 관리 페이지
    path: '/admin/satisfaction',
    component: () => import('@/views/AppAdminSatisfaction.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
