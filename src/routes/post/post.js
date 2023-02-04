export default [
  {
    // 포스트 작성 페이지
    path: '/add-post',
    component: () => import('@/views/AppSavePost.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
      pageType: 'D01002',
    },
  },
  {
    // 포스트 수정 페이지
    path: '/edit-post/:id',
    component: () => import('@/views/AppSavePost.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
      pageType: 'D01002',
    },
  },
  {
    // 포스트 뷰 페이지
    path: '/post/:id',
    component: () => import('@/views/AppPostView.vue'),
    meta: {
      pageType: 'D01002',
    },
  },
];
