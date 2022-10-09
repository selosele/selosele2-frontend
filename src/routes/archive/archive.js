export default [
  {
    path: '/year',
    component: () => import('@/views/AppYear.vue'),
    meta: {
      title: '연도별 모아보기',
    },
  },
];
