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
    // 콘텐츠 관리 페이지
    path: '/admin/content',
    component: () => import('@/views/AppContent.vue'),
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
  {
    // 카테고리/태그 관리 페이지
    path: '/admin/category',
    component: () => import('@/views/AppAdminCategory.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
