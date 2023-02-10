export default [
  {
    // 콘텐츠 작성 페이지
    path: '/add-content',
    component: () => import('@/views/AppSavePost.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
      pageType: 'D01003',
    },
  },
  {
    // 콘텐츠 수정 페이지
    path: '/edit-content/:id',
    component: () => import('@/views/AppSavePost.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
      pageType: 'D01003',
    },
  },
  {
    // 콘텐츠 뷰 페이지
    path: '/content/:id',
    component: () => import('@/views/AppPostView.vue'),
    meta: {
      pageType: 'D01003',
    },
  },
];
