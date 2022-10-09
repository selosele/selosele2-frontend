export default [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/AppError.vue'),
    meta: {
      title: '페이지를 찾을 수 없습니다.',
      showSidebar: false,
      showSatis: false,
    },
  },
];
