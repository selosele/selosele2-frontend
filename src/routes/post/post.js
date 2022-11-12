export default [
  {
    path: '/post/:id',
    component: () => import('@/views/AppPostView.vue'),
    meta: {
      title: '포스트 상세 조회',
    },
  },
];
