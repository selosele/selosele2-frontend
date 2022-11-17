export default [
  {
    // 연도별 모아보기 페이지
    path: '/year',
    component: () => import('@/views/AppYear.vue'),
  },
  {
    // 카테고리별 포스트 페이지
    path: '/category/:id',
    component: () => import('@/views/AppCategory.vue'),
    props: (route) => ({
      type: 'category',
      id: route.params.id,
    }),
  },
  {
    // 태그별 포스트 페이지
    path: '/tag/:id',
    component: () => import('@/views/AppCategory.vue'),
    props: (route) => ({
      type: 'tag',
      id: route.params.id,
    }),
  },
];
