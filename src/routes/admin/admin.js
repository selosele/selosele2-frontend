export default [
  {
    // 블로그 환경설정 페이지
    path: '/admin/blog-config',
    component: () => import('@/views/AppAdminBlogConfig.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 공통코드 관리 페이지
    path: '/admin/code',
    component: () => import('@/views/AppAdminCode.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 콘텐츠 관리 페이지
    path: '/admin/content',
    component: () => import('@/views/AppAdminContent.vue'),
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
  {
    // 메뉴 관리 페이지
    path: '/admin/menu',
    component: () => import('@/views/AppAdminMenu.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 이미지 업로드 페이지
    path: '/admin/file-upload',
    component: () => import('@/views/AppAdminFileUpload.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 포스트 댓글 관리 페이지
    path: '/admin/post-reply',
    component: () => import('@/views/AppAdminPostReply.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 검색 관리 페이지
    path: '/admin/search',
    component: () => import('@/views/AppAdminSearch.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    // 프로그램 관리 페이지
    path: '/admin/program',
    component: () => import('@/views/AppAdminProgram.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
