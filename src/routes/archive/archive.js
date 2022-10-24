export default [
  {
    path: '/year',
    component: () => import('@/views/AppYear.vue'),
    meta: {
      title: '연도별 모아보기',
    },
  },
  {
    path: '/category/:categoryId',
    component: () => import('@/views/AppCategory.vue'),
    props: true,
    meta: {
      title: '카테고리',
    }
  },
];
