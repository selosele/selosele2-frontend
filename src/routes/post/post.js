export default [
  {
    // 포스트 작성 페이지
    path: '/add-post',
    component: () => import('@/views/AppSavePost.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
      type: 'post',
    },
  },
  {
    // 포스트 뷰 페이지
    path: '/post/:id',
    component: () => import('@/views/AppPostView.vue'),
    meta: {
      type: 'post',
    },
  },
];
