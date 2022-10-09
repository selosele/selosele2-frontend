export default [
  {
    path: '/',
    component: () => import('@/views/AppIndex.vue'),
    meta: {
      pageType: 'home',
      showSatis: false
    },
  },
];
