export default [
  {
    // 메인 페이지
    path: '/',
    component: () => import('@/views/AppIndex.vue'),
    meta: {
      pageType: 'D01001',
      showSatis: false
    },
  },
];
