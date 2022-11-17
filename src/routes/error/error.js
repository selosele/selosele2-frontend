export default [
  {
    // 에러 페이지
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/AppError.vue'),
    meta: {
      showSidebar: false,
      showSatis: false,
    },
  },
];
