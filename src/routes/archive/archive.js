export default [
  {
    path: '/year',
    component: () => import('@/views/AppYear.vue'),
    meta: {
      title: '연도별 모아보기',
    },
  },
  {
    path: '/category/:nm:/:id',
    component: () => import('@/views/AppCategory.vue'),
    props: (route) => ({
      type: 'category',
      nm: route.params.nm,
      id: route.params.id,
    }),
    meta: {
      title: '카테고리',
    },
  },
  {
    path: '/tag/:nm:/:id',
    component: () => import('@/views/AppCategory.vue'),
    props: (route) => ({
      type: 'tag',
      nm: route.params.nm,
      id: route.params.id,
    }),
    meta: {
      title: '태그',
    },
  },
];
