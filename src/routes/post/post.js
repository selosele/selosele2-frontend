export default [
  {
    // 포스트 뷰 페이지
    path: '/post/:id',
    component: () => import('@/views/AppPostView.vue'),
  },
];
