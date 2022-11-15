export default [
  {
    path: '/year',
    component: () => import('@/views/AppYear.vue'),
  },
  {
    path: '/category/:id',
    component: () => import('@/views/AppCategory.vue'),
    props: (route) => ({
      type: 'category',
      id: route.params.id,
    }),
  },
  {
    path: '/tag/:id',
    component: () => import('@/views/AppCategory.vue'),
    props: (route) => ({
      type: 'tag',
      id: route.params.id,
    }),
  },
];
