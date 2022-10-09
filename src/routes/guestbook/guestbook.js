export default [
  {
    path: '/guestbook',
    component: () => import('@/views/AppGuestbook.vue'),
    meta: {
      title: '방명록',
    },
  },
];
