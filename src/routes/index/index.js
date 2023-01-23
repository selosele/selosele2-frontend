export default [
  {
    // 메인 페이지
    path: '/',
    component: () => import('@/views/AppIndex.vue'),
    meta: {
      type: 'home',
      showSatis: false
    },
  },
];
