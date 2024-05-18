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
    // 이미지 업로드 페이지
    path: '/admin/file-upload',
    component: () => import('@/views/AppAdminFileUpload.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
