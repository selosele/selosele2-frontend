export default [
  {
    // 오류 페이지
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/AppError.vue'),
    meta: {
      showSidebar: false,
      showSatis: false,
    },
  },
];
